import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:http/http.dart' as http;
import 'package:url_launcher/url_launcher.dart';
import 'package:web/web.dart' as web;

/// Endpoint that validates the license key and returns a signed download URL.
/// See `docs/guides/screen_map/backend_entitlement_server.md` in the visvah
/// repo for the request/response contract.
const String _adminBaseUrl = 'https://visvah.com';

void main() {
  runApp(const VisApp());
}

class VisApp extends StatelessWidget {
  const VisApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Vis — Coming Soon',
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark().copyWith(
        scaffoldBackgroundColor: const Color(0xFF0A0A0A),
      ),
      home: const ComingSoonPage(),
    );
  }
}

class ComingSoonPage extends StatefulWidget {
  const ComingSoonPage({super.key});

  @override
  State<ComingSoonPage> createState() => _ComingSoonPageState();
}

class _ComingSoonPageState extends State<ComingSoonPage>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _fadeIn;
  final TextEditingController _keyController = TextEditingController();

  bool _submitting = false;
  String? _errorMessage;
  String? _issuedDeepLink;
  String? _issuedKey;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    );
    _fadeIn = CurvedAnimation(parent: _controller, curve: Curves.easeOut);
    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    _keyController.dispose();
    super.dispose();
  }

  Future<void> _openUrl(String url) async {
    final uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }

  Future<void> _requestDownload() async {
    final key = _keyController.text.trim().toUpperCase();
    if (key.isEmpty) {
      setState(() => _errorMessage = 'Enter your license key');
      return;
    }

    setState(() {
      _submitting = true;
      _errorMessage = null;
    });

    try {
      final response = await http.post(
        Uri.parse('$_adminBaseUrl/api/license-key/issue-download-token'),
        headers: const {'Content-Type': 'application/json'},
        body: jsonEncode({'license_key': key, 'platform': 'windows'}),
      );

      Map<String, dynamic>? body;
      try {
        body = jsonDecode(response.body) as Map<String, dynamic>;
      } catch (_) {
        body = null;
      }

      if (response.statusCode != 200 || body == null || body['success'] != true) {
        final code = body?['error']?.toString() ?? 'request_failed';
        setState(() {
          _errorMessage = _humanError(code, response.statusCode);
        });
        return;
      }

      final downloadUrl = body['download_url'] as String;
      final deepLink = body['deep_link'] as String;

      // Trigger the browser download.
      final anchor = web.HTMLAnchorElement()
        ..href = downloadUrl
        ..download = 'VisvahSetup.exe';
      anchor.click();

      setState(() {
        _issuedDeepLink = deepLink;
        _issuedKey = key;
      });
    } catch (e) {
      setState(() {
        _errorMessage = 'Network error — please try again.';
      });
    } finally {
      if (mounted) setState(() => _submitting = false);
    }
  }

  String _humanError(String code, int status) {
    switch (code) {
      case 'invalid_code':
        return 'License key not recognised.';
      case 'revoked':
        return 'This license key has been revoked.';
      case 'expired':
        return 'This license key has expired.';
      case 'already_redeemed':
        return 'This key is already in use on the maximum number of devices.';
      case 'key_being_claimed':
        return 'This key is being activated on another device. Try again in 15 minutes.';
      case 'RATE_LIMITED':
        return 'Too many attempts — try again in a minute.';
      default:
        return 'Could not issue download (status $status).';
    }
  }

  void _openApp() {
    if (_issuedDeepLink == null) return;
    web.window.location.assign(_issuedDeepLink!);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(vertical: 48, horizontal: 16),
          child: FadeTransition(
            opacity: _fadeIn,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Text(
                  'Vis',
                  style: TextStyle(
                    fontSize: 72,
                    fontWeight: FontWeight.w200,
                    letterSpacing: 8,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(height: 12),
                Text(
                  'private alpha access',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w300,
                    letterSpacing: 4,
                    color: Colors.white.withValues(alpha: 0.5),
                  ),
                ),
                const SizedBox(height: 40),
                _DownloadGate(
                  controller: _keyController,
                  submitting: _submitting,
                  errorMessage: _errorMessage,
                  issuedDeepLink: _issuedDeepLink,
                  issuedKey: _issuedKey,
                  onSubmit: _requestDownload,
                  onOpenApp: _openApp,
                ),
                const SizedBox(height: 32),
                TextButton.icon(
                  onPressed: () => _openUrl('https://visvah.com/knu/'),
                  icon: const Text('📖', style: TextStyle(fontSize: 16)),
                  label: Text(
                    'Tokenomics Book',
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w300,
                      letterSpacing: 2,
                      color: Colors.white.withValues(alpha: 0.7),
                    ),
                  ),
                  style: TextButton.styleFrom(
                    padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                    side: BorderSide(color: Colors.white.withValues(alpha: 0.2)),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(6),
                    ),
                  ),
                ),
                const SizedBox(height: 40),
                Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    _SocialIcon(
                      icon: FontAwesomeIcons.github,
                      onTap: () => _openUrl('https://github.com'),
                    ),
                    _SocialIcon(
                      icon: FontAwesomeIcons.xTwitter,
                      onTap: () => _openUrl('https://x.com'),
                    ),
                    _SocialIcon(
                      icon: FontAwesomeIcons.linkedin,
                      onTap: () => _openUrl('https://linkedin.com'),
                    ),
                    _SocialIcon(
                      icon: FontAwesomeIcons.instagram,
                      onTap: () => _openUrl('https://instagram.com'),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _DownloadGate extends StatelessWidget {
  const _DownloadGate({
    required this.controller,
    required this.submitting,
    required this.errorMessage,
    required this.issuedDeepLink,
    required this.issuedKey,
    required this.onSubmit,
    required this.onOpenApp,
  });

  final TextEditingController controller;
  final bool submitting;
  final String? errorMessage;
  final String? issuedDeepLink;
  final String? issuedKey;
  final VoidCallback onSubmit;
  final VoidCallback onOpenApp;

  @override
  Widget build(BuildContext context) {
    final hasIssuedDownload = issuedDeepLink != null;

    return ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: 420),
      child: Column(
        children: [
          TextField(
            controller: controller,
            enabled: !submitting && !hasIssuedDownload,
            textCapitalization: TextCapitalization.characters,
            inputFormatters: [
              FilteringTextInputFormatter.allow(RegExp('[A-Za-z0-9-]')),
              LengthLimitingTextInputFormatter(20),
            ],
            style: const TextStyle(
              color: Colors.white,
              fontFamily: 'monospace',
              letterSpacing: 2,
            ),
            decoration: InputDecoration(
              hintText: 'LIC-XXXX-YYYY',
              hintStyle: TextStyle(color: Colors.white.withValues(alpha: 0.3)),
              filled: true,
              fillColor: Colors.white.withValues(alpha: 0.05),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(6),
                borderSide: BorderSide(color: Colors.white.withValues(alpha: 0.15)),
              ),
              enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(6),
                borderSide: BorderSide(color: Colors.white.withValues(alpha: 0.15)),
              ),
              focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(6),
                borderSide: BorderSide(color: Colors.white.withValues(alpha: 0.4)),
              ),
              errorText: errorMessage,
            ),
            onSubmitted: (_) => submitting ? null : onSubmit(),
          ),
          const SizedBox(height: 16),
          if (!hasIssuedDownload)
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: submitting ? null : onSubmit,
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.white,
                  foregroundColor: Colors.black,
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(6),
                  ),
                ),
                child: submitting
                    ? const SizedBox(
                        height: 16,
                        width: 16,
                        child: CircularProgressIndicator(strokeWidth: 2),
                      )
                    : const Text(
                        'Download for Windows',
                        style: TextStyle(
                          fontWeight: FontWeight.w500,
                          letterSpacing: 1,
                        ),
                      ),
              ),
            )
          else
            Column(
              children: [
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: onOpenApp,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.white,
                      foregroundColor: Colors.black,
                      padding: const EdgeInsets.symmetric(vertical: 14),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(6),
                      ),
                    ),
                    child: const Text(
                      'Now open Visvah',
                      style: TextStyle(
                        fontWeight: FontWeight.w500,
                        letterSpacing: 1,
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 12),
                _KeyFallback(licenseKey: issuedKey ?? ''),
              ],
            ),
        ],
      ),
    );
  }
}

class _KeyFallback extends StatelessWidget {
  const _KeyFallback({required this.licenseKey});

  final String licenseKey;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.04),
        borderRadius: BorderRadius.circular(6),
        border: Border.all(color: Colors.white.withValues(alpha: 0.1)),
      ),
      child: Row(
        children: [
          Expanded(
            child: Text(
              licenseKey,
              style: const TextStyle(
                color: Colors.white70,
                fontFamily: 'monospace',
                letterSpacing: 1.5,
              ),
            ),
          ),
          IconButton(
            icon: const Icon(Icons.copy, size: 18, color: Colors.white54),
            tooltip: 'Copy key',
            onPressed: () {
              Clipboard.setData(ClipboardData(text: licenseKey));
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Key copied — paste it in the app if needed')),
              );
            },
          ),
        ],
      ),
    );
  }
}

class _SocialIcon extends StatelessWidget {
  final IconData icon;
  final VoidCallback onTap;

  const _SocialIcon({required this.icon, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 14),
      child: IconButton(
        icon: FaIcon(icon, size: 20, color: Colors.white54),
        hoverColor: Colors.white10,
        onPressed: onTap,
      ),
    );
  }
}
