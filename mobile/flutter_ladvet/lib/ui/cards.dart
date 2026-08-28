import 'package:flutter/material.dart';

class PetAdoptionCardScreen extends StatefulWidget {
  const PetAdoptionCardScreen({
    super.key,
    required this.pet,
    this.onBackPressed,
    this.onFavoriteToggle,
    this.onAdoptRequest,
  });

  final PetInfo pet;
  final VoidCallback? onBackPressed;
  final ValueChanged<bool>? onFavoriteToggle;
  final VoidCallback? onAdoptRequest;

  @override
  State<PetAdoptionCardScreen> createState() => _PetAdoptionCardScreenState();
}

class _PetAdoptionCardScreenState extends State<PetAdoptionCardScreen> {
  bool _favorito = false;

  static const Color _bgColor = Color(0xFFFBE4E4);
  static const Color _cardHeaderColor = Color(0xFFE8A9AC);
  static const Color _cardBodyColor = Color(0xFFD98E92);
  static const Color _buttonColor = Color(0xFF7B84B8);

  void _toggleFavorito() {
    setState(() => _favorito = !_favorito);
    widget.onFavoriteToggle?.call(_favorito);
  }

  @override
  Widget build(BuildContext context) {
    final pet = widget.pet;

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
                                  child: pet.imageUrl != null
                                      ? Image.network(
                                          pet.imageUrl!,
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
          _CircleIconButton(icon: Icons.replay, onTap: onBackPressed),
          _StatusDot(),
          Row(
            children: [
              Icon(Icons.pets, size: 18, color: Color(0xFFD98E92)),
              SizedBox(width: 4),
              Text(
                "L'ADVET",
                style: TextStyle(
                  color: Color(0xFFD98E92),
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
  _StatusDot();

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
        child: Icon(icon, size: 18, color: const Color(0xFFD98E92)),
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

class PetInfo {
  const PetInfo({
    required this.nome,
    required this.idade,
    required this.especie,
    required this.sexo,
    required this.vacinas,
    required this.temperamento,
    required this.descricao,
    required this.status,
    this.imageUrl,
  });

  final String nome;
  final String idade;
  final String especie;
  final String sexo;
  final String vacinas;
  final String temperamento;
  final String descricao;
  final String status;
  final String? imageUrl;
}
