import 'package:flutter/material.dart';
import 'package:flutter_ladvet/ui/login.dart';

import 'loginvet.dart';

class Home2Page extends StatelessWidget {
  const Home2Page({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Container(color: const Color(0xFFFBECE9)),
          Positioned(
            top: -60,
            left: -60,
            child: _blob(220, const Color(0xFFD98B7A).withOpacity(0.55)),
          ),
          Positioned(
            top: 40,
            right: -80,
            child: _blob(240, const Color(0xFFC9C9E8).withOpacity(0.55)),
          ),
          Positioned(
            top: 260,
            left: -40,
            child: _blob(200, const Color(0xFFE8C9CE).withOpacity(0.6)),
          ),
          Positioned(
            bottom: 60,
            right: -60,
            child: _blob(220, const Color(0xFFC9C9E8).withOpacity(0.45)),
          ),
          Positioned(
            bottom: -80,
            left: -40,
            child: _blob(220, const Color(0xFFE8C9CE).withOpacity(0.5)),
          ),

          SafeArea(
            child: Column(
              children: [
                Padding(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 16,
                    vertical: 8,
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      _CircleIconButton(
                        icon: Icons.undo,
                        onTap: () => Navigator.pop(context),
                      ),
                      Row(
                        children: [
                          Icon(
                            Icons.pets,
                            size: 18,
                            color: const Color(0xFFD98B7A),
                          ),
                          const SizedBox(width: 4),
                          Text(
                            'LADVET',
                            style: TextStyle(
                              color: const Color(0xFFD98B7A),
                              fontWeight: FontWeight.w600,
                              fontSize: 14,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 40),

                const Text(
                  'Seja bem-vindo!',
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF2E2E5C),
                  ),
                ),

                const SizedBox(height: 200),

                _OptionCard(
                  label: 'Sou adotante',
                  imagePath: 'adotante.jpg',
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => const LoginPage(),
                      ),
                    );
                  },
                ),

                const SizedBox(height: 40),

                _OptionCard(
                  label: 'Sou veterinário',
                  imagePath: 'veterinario.png',
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => const LoginVet()),
                    );
                  },
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  static Widget _blob(double size, Color color) {
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(color: color, shape: BoxShape.circle),
    );
  }
}

class _CircleIconButton extends StatelessWidget {
  final IconData icon;
  final VoidCallback onTap;

  const _CircleIconButton({required this.icon, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.white.withOpacity(0.6),
      shape: const CircleBorder(),
    );
  }
}

class _OptionCard extends StatelessWidget {
  final String label;
  final String imagePath;
  final VoidCallback onTap;

  const _OptionCard({
    required this.label,
    required this.imagePath,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 32),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius: BorderRadius.circular(24),
          onTap: onTap,
          child: Container(
            height: 78,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(24),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.08),
                  blurRadius: 8,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: Row(
              children: [
                Container(
                  width: 78,
                  height: 78,
                  decoration: const BoxDecoration(
                    color: Colors.white,
                    shape: BoxShape.rectangle,
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(20),
                      bottomLeft: Radius.circular(20),
                    ),
                  ),
                  padding: const EdgeInsets.all(10),
                  child: ClipOval(
                    child: Image.asset(
                      imagePath,
                      fit: BoxFit.cover,

                      errorBuilder: (context, error, stackTrace) => Icon(
                        Icons.pets,
                        color: const Color(0xFFD98B7A),
                        size: 30,
                      ),
                    ),
                  ),
                ),

                Expanded(
                  child: Container(
                    height: 78,
                    padding: const EdgeInsets.only(left: 16),
                    alignment: Alignment.centerLeft,
                    decoration: BoxDecoration(
                      color: const Color(0xFFC9857B),
                      borderRadius: const BorderRadius.horizontal(
                        right: Radius.circular(24),
                      ),
                    ),
                    child: Text(
                      label,
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
