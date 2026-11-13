import 'package:flutter/material.dart';
import 'package:flutter_ladvet/models/pet.dart';
import 'package:flutter_ladvet/models/pets.dart';
import 'package:flutter_ladvet/ui/configuracaovet.dart';
import 'package:flutter_ladvet/ui/historia.dart';
import 'package:flutter_ladvet/ui/cadastroanimal.dart';

import 'cards.dart';

class AdocaoPage extends StatelessWidget {
  const AdocaoPage({super.key});

  static const List<Pet> pets = MockupPets.pets;

  static const Color headerColor = Color.fromARGB(255, 226, 187, 186);
  static const Color cardColor = Color.fromARGB(255, 182, 119, 117);
  static const Color textColor = Color(0xFF4B1528);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFFBEAF0),
      body: SafeArea(
        child: Column(
          children: [
            // CABEÇALHO ROSA
            Container(
              width: double.infinity,
              color: headerColor,
              padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 4),
              child: Row(
                children: [
                  // BOTÃO VOLTAR
                  _botaoIcone(
                    icon: Icons.reply_rounded,
                    cor: headerColor,
                    tamanhoIcone: 26,
                    onPressed: () {
                      Navigator.maybePop(context);
                    },
                  ),

                  const SizedBox(width: 10),

                  // CONFIGURAÇÃO
                  _botaoIcone(
                    icon: Icons.account_circle_outlined,
                    cor: headerColor,
                    corIcone: Colors.white,
                    tamanhoIcone: 26,
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => Configuracaovet(),
                        ),
                      );
                    },
                  ),

                  const Spacer(),

                  // LOGO CENTRALIZADO
                  Image.asset(
                    'assets/logo.png',
                    width: 100,
                    height: 60,
                    fit: BoxFit.contain,
                  ),

                  const Spacer(),

                  const SizedBox(width: 114),
                ],
              ),
            ),

            // BOTÕES FORA DO CABEÇALHO ROSA
            Container(
              width: double.infinity,
              color: const Color(0xFFFBEAF0),
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
              child: Wrap(
                alignment: WrapAlignment.end,
                spacing: 8,
                runSpacing: 8,
                children: [
                  // NOSSA HISTÓRIA
                  _botaoTexto(
                    texto: 'Nossa História',
                    icone: Icons.favorite,
                    cor: const Color(0xFF293D70),
                    corTexto: Colors.white,
                    compacto: true,
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => NossaHistoriaPage(),
                        ),
                      );
                    },
                  ),

                  // SOLICITAÇÕES
                  _botaoTexto(
                    texto: 'Solicitações',
                    icone: Icons.notifications_none,
                    cor: const Color.fromARGB(255, 229, 181, 181),
                    corTexto: const Color(0xFF814D4D),
                    compacto: true,
                    onPressed: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Página de solicitações em breve!'),
                        ),
                      );
                    },
                  ),

                  // NOVO ANIMAL
                  _botaoTexto(
                    texto: 'Novo animal',
                    icone: Icons.add,
                    cor: const Color(0xFF7888B5),
                    corTexto: Colors.white,
                    compacto: true,
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => CadastrarAnimalPage(),
                        ),
                      );
                    },
                  ),
                ],
              ),
            ),

            // LISTA DE ANIMAIS
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(12),
                child: Column(
                  children: [
                    GridView.builder(
                      shrinkWrap: true,
                      physics: const NeverScrollableScrollPhysics(),
                      itemCount: AdocaoPage.pets.length,
                      gridDelegate:
                          const SliverGridDelegateWithFixedCrossAxisCount(
                            crossAxisCount: 2,
                            crossAxisSpacing: 10,
                            mainAxisSpacing: 10,
                            childAspectRatio: 0.78,
                          ),
                      itemBuilder: (context, index) {
                        return PetCard(pet: AdocaoPage.pets[index]);
                      },
                    ),

                    const SizedBox(height: 12),

                    const Text(
                      'Fim.',
                      style: TextStyle(color: Color(0xFF993556), fontSize: 12),
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

  // BOTÕES DE ÍCONE
  static Widget _botaoIcone({
    required IconData icon,
    required Color cor,
    Color corIcone = Colors.white,
    double tamanhoIcone = 28,
    required VoidCallback onPressed,
  }) {
    return SizedBox(
      width: 52,
      height: 52,
      child: ElevatedButton(
        onPressed: onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: cor,
          foregroundColor: corIcone,
          elevation: 0,
          padding: EdgeInsets.zero,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15),
          ),
        ),
        child: Icon(icon, size: tamanhoIcone),
      ),
    );
  }

  // BOTÕES DE TEXTO
  static Widget _botaoTexto({
    required String texto,
    required IconData icone,
    required Color cor,
    required Color corTexto,
    required VoidCallback onPressed,
    bool compacto = false,
  }) {
    return ElevatedButton.icon(
      onPressed: onPressed,
      icon: Icon(icone, size: compacto ? 14 : 17),
      label: Text(
        texto,
        style: TextStyle(
          fontSize: compacto ? 11 : 14,
          fontWeight: FontWeight.w600,
        ),
      ),
      style: ElevatedButton.styleFrom(
        backgroundColor: cor,
        foregroundColor: corTexto,
        elevation: 0,
        padding: EdgeInsets.symmetric(
          horizontal: compacto ? 9 : 16,
          vertical: compacto ? 13 : 17,
        ),
        minimumSize: Size.zero,
        tapTargetSize: MaterialTapTargetSize.shrinkWrap,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
      ),
    );
  }
}

// CARD DOS ANIMAIS
class PetCard extends StatelessWidget {
  const PetCard({super.key, required this.pet});

  final Pet pet;

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(10),
      child: Container(
        color: AdocaoPage.cardColor,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: SizedBox(
                width: double.infinity,
                child: pet.imagePath != null
                    ? GestureDetector(
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) =>
                                  PetAdoptionCardScreen(idPet: pet.id),
                            ),
                          );
                        },
                        child: Image.asset(pet.imagePath!, fit: BoxFit.cover),
                      )
                    : Container(
                        color: AdocaoPage.headerColor,
                        alignment: Alignment.center,
                        child: const Icon(
                          Icons.pets,
                          size: 34,
                          color: Color(0xFFFBEAF0),
                        ),
                      ),
              ),
            ),

            Padding(
              padding: const EdgeInsets.all(8),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Nome: ${pet.nome}',
                    style: const TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.w600,
                      color: Color.fromARGB(255, 249, 242, 244),
                    ),
                  ),

                  const SizedBox(height: 2),

                  Text(
                    'Idade: ${pet.idade}',
                    style: const TextStyle(
                      fontSize: 11,
                      color: Color.fromARGB(255, 245, 234, 238),
                    ),
                  ),

                  const SizedBox(height: 2),

                  Text(
                    'Especie: ${pet.especie}',
                    style: const TextStyle(
                      fontSize: 11,
                      color: Color.fromARGB(255, 247, 239, 242),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
