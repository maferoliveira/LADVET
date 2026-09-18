import 'package:flutter/material.dart';
import 'package:flutter_ladvet/models/pet.dart';
import 'package:flutter_ladvet/models/pets.dart';
import 'package:flutter_ladvet/ui/adocao.dart';

class PetAdoptionCardScreen extends StatefulWidget {
  const PetAdoptionCardScreen({
    super.key,
    required this.idPet,
    this.onBackPressed,
    this.onFavoriteToggle,
    this.onAdoptRequest,
  });

  final int idPet;
  final VoidCallback? onBackPressed;
  final ValueChanged<bool>? onFavoriteToggle;
  final VoidCallback? onAdoptRequest;

  @override
  State<PetAdoptionCardScreen> createState() => _PetAdoptionCardScreenState();
}

class _PetAdoptionCardScreenState extends State<PetAdoptionCardScreen> {
  bool _favorito = false;

  static const Color _bgColor = Color(0xFFFBE4E4);
  static const Color _cardHeaderColor = Color.fromARGB(255, 189, 146, 149);
  static const Color _cardBodyColor = Color.fromARGB(255, 184, 130, 133);
  static const Color _buttonColor = Color(0xFF7B84B8);

  static const List<Pet> pets = MockupPets.pets;

  void _toggleFavorito() {
    setState(() => _favorito = !_favorito);
    widget.onFavoriteToggle?.call(_favorito);
  }

  @override
  Widget build(BuildContext context) {
    final pet = pets.firstWhere((e) => e.id == widget.idPet);

    return Scaffold(
      backgroundColor: _bgColor,
      body: SafeArea(
        child: Column(
          children: [
            _TopBar(onBackPressed: widget.onBackPressed),
            Expanded(
              child: SingleChildScrollView(
                padding: EdgeInsets.fromLTRB(20, 8, 20, 20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    ClipRRect(
                      borderRadius: BorderRadius.circular(24),
                      child: Container(
                        color: _cardHeaderColor,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.stretch,
                          children: [
                            // Foto do pet
                            Padding(
                              padding: EdgeInsets.all(12),
                              child: ClipRRect(
                                borderRadius: BorderRadius.circular(16),
                                child: AspectRatio(
                                  aspectRatio: 1,
                                  child: pet.imagePath != null
                                      ? Image.network(
                                          pet.imagePath!,
                                          fit: BoxFit.cover,
                                        )
                                      : Container(
                                          color: Colors.white,
                                          child: Icon(
                                            Icons.pets,
                                            size: 64,
                                            color: Colors.grey,
                                          ),
                                        ),
                                ),
                              ),
                            ),

                            Container(
                              color: _cardBodyColor,
                              padding: EdgeInsets.fromLTRB(16, 12, 16, 16),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Expanded(
                                        child: Column(
                                          crossAxisAlignment:
                                              CrossAxisAlignment.start,
                                          children: [
                                            _InfoLine(
                                              label: 'Nome',
                                              value: pet.nome,
                                              bold: true,
                                            ),
                                            _InfoLine(
                                              label: 'Idade',
                                              value: pet.idade,
                                              bold: true,
                                            ),
                                            _InfoLine(
                                              label: 'Espécie',
                                              value: pet.especie,
                                              bold: true,
                                            ),
                                          ],
                                        ),
                                      ),
                                      IconButton(
                                        onPressed: _toggleFavorito,
                                        icon: Icon(
                                          _favorito
                                              ? Icons.favorite
                                              : Icons.favorite_border,
                                          color: Colors.white,
                                        ),
                                      ),
                                    ],
                                  ),

                                  Padding(
                                    padding: EdgeInsets.symmetric(vertical: 8),
                                    child: Divider(
                                      color: Colors.white54,
                                      height: 1,
                                    ),
                                  ),

                                  _DetailText('Sexo: ${pet.sexo}'),
                                  SizedBox(height: 10),
                                  _DetailText('Vacinas: ${pet.vacinas}'),
                                  SizedBox(height: 10),
                                  _DetailText(
                                    'Temperamento: ${pet.temperamento}',
                                  ),
                                  SizedBox(height: 10),
                                  _DetailText(pet.descricao, bold: true),

                                  SizedBox(height: 12),
                                  Center(
                                    child: Text(
                                      pet.status,
                                      style: TextStyle(
                                        color: Colors.white70,
                                        fontSize: 13,
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),

                    SizedBox(height: 20),

                    SizedBox(
                      height: 52,
                      child: ElevatedButton(
                        onPressed: widget.onAdoptRequest,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: _buttonColor,
                          foregroundColor: Colors.white,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(16),
                          ),
                          elevation: 0,
                        ),
                        child: Text(
                          'Solicitar adoção',
                          style: TextStyle(
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
          ],
        ),
      ),
    );
  }
}

class _TopBar extends StatelessWidget {
  const _TopBar({this.onBackPressed});

  final VoidCallback? onBackPressed;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          _CircleIconButton(
            icon: Icons.replay,
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const AdocaoPage()),
              );
            },
          ),
          _StatusDot(),
          Row(
            children: [
              Icon(Icons.pets, size: 18, color: Color(0xFFD98E92)),
              SizedBox(width: 4),
              Text(
                "LADVET",
                style: TextStyle(
                  color: Color.fromARGB(255, 128, 93, 95),
                  fontWeight: FontWeight.bold,
                  fontSize: 14,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _StatusDot extends StatelessWidget {
  const _StatusDot();

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 22,
      height: 22,
      decoration: BoxDecoration(color: Colors.black87, shape: BoxShape.circle),
    );
  }
}

class _CircleIconButton extends StatelessWidget {
  const _CircleIconButton({required this.icon, this.onTap});

  final IconData icon;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(20),
      child: Container(
        width: 36,
        height: 36,
        decoration: BoxDecoration(
          color: Colors.white,
          shape: BoxShape.circle,
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.05),
              blurRadius: 4,
              offset: Offset(0, 2),
            ),
          ],
        ),
        child: Icon(
          icon,
          size: 18,
          color: const Color.fromARGB(255, 138, 95, 97),
        ),
      ),
    );
  }
}

class _InfoLine extends StatelessWidget {
  const _InfoLine({
    required this.label,
    required this.value,
    this.bold = false,
  });

  final String label;
  final String value;
  final bool bold;

  @override
  Widget build(BuildContext context) {
    return Text(
      '$label: $value',
      style: TextStyle(
        color: Colors.white,
        fontSize: 14,
        fontWeight: bold ? FontWeight.bold : FontWeight.normal,
      ),
    );
  }
}

class _DetailText extends StatelessWidget {
  const _DetailText(this.text, {this.bold = false});

  final String text;
  final bool bold;

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: TextStyle(
        color: Colors.white,
        fontSize: 13,
        height: 1.4,
        fontWeight: bold ? FontWeight.bold : FontWeight.normal,
      ),
    );
  }
}
