import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:url_launcher/url_launcher.dart';

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
    super.dispose();
  }

  Future<void> _openUrl(String url) async {
    final uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
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
                'coming soon...',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w300,
                  letterSpacing: 4,
                  color: Colors.white.withValues(alpha: 0.5),
                ),
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
