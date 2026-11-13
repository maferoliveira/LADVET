import 'package:flutter/material.dart';
import 'package:flutter_ladvet/models/pet.dart';
import 'package:flutter_ladvet/models/pets.dart';
import 'package:flutter_ladvet/ui/configuracao.dart';
import 'package:flutter_ladvet/ui/favoritos.dart';

import 'cards.dart';

class AdocaoPage extends StatefulWidget {
  const AdocaoPage({super.key});

  static const List<Pet> pets = MockupPets.pets;

  static const Color headerColor = Color.fromARGB(255, 226, 187, 186);
  static const Color cardColor = Color.fromARGB(255, 182, 119, 117);
  static const Color textColor = Color(0xFF4B1528);

  @override
  State<AdocaoPage> createState() => _AdocaoPageState();
}

class _AdocaoPageState extends State<AdocaoPage> {
  bool _somenteFavoritas = false;

  Future<void> _alternarFavorito(int id) async {
    try {
      await FavoritosController.alternar(id);
    } catch (error) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Não foi possível salvar seus favoritos no aparelho.'),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFFBEAF0),
      body: SafeArea(
        child: Column(
          children: [
            Container(
              color: AdocaoPage.headerColor,
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  IconButton(
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => ConfiguracaoPage(),
                        ),
                      );
                    },
                    icon: const Icon(
                      Icons.account_circle_outlined,
                      color: Color.fromARGB(255, 182, 119, 117),
                      size: 26,
                    ),
                  ),
                  Image.asset(
                    'assets/logo.png',
                    width: 120,
                    height: 48,
                    fit: BoxFit.contain,
                    errorBuilder: (context, error, stackTrace) {
                      return const Text(
                        'LADVET',
                        style: TextStyle(
                          color: Color(0xFFFBEAF0),
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                          letterSpacing: 0.5,
                        ),
                      );
                    },
                  ),
                ],
              ),
            ),
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(12),
                child: Column(
                  children: [
                    Align(
                      alignment: Alignment.centerRight,
                      child: ElevatedButton.icon(
                        onPressed: () {
                          setState(() {
                            _somenteFavoritas = !_somenteFavoritas;
                          });
                        },
                        icon: Icon(
                          _somenteFavoritas ? Icons.pets : Icons.favorite,
                          size: 18,
                        ),
                        label: Text(
                          _somenteFavoritas ? 'TODOS OS ANIMAIS' : 'FAVORITAS',
                        ),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: AdocaoPage.headerColor,
                          foregroundColor: Colors.white,
                          elevation: 2,
                          padding: const EdgeInsets.symmetric(
                            horizontal: 16,
                            vertical: 11,
                          ),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(20),
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 12),
                    ValueListenableBuilder<Set<int>>(
                      valueListenable: FavoritosController.ids,
                      builder: (context, favoritos, child) {
                        final animais = AdocaoPage.pets.where((pet) {
                          return !_somenteFavoritas ||
                              favoritos.contains(pet.id);
                        }).toList();

                        if (animais.isEmpty) {
                          return Container(
                            width: double.infinity,
                            padding: const EdgeInsets.all(25),
                            margin: const EdgeInsets.only(top: 30),
                            decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: BorderRadius.circular(20),
                            ),
                            child: const Column(
                              children: [
                                Icon(
                                  Icons.favorite_border,
                                  color: Color(0xFFD18F92),
                                  size: 40,
                                ),
                                SizedBox(height: 12),
                                Text(
                                  'Você ainda não possui animais favoritos.',
                                  textAlign: TextAlign.center,
                                  style: TextStyle(
                                    color: Color(0xFF775E7B),
                                    fontSize: 15,
                                  ),
                                ),
                              ],
                            ),
                          );
                        }

                        return GridView.builder(
                          shrinkWrap: true,
                          physics: const NeverScrollableScrollPhysics(),
                          itemCount: animais.length,
                          gridDelegate:
                              const SliverGridDelegateWithFixedCrossAxisCount(
                                crossAxisCount: 2,
                                crossAxisSpacing: 10,
                                mainAxisSpacing: 10,
                                childAspectRatio: 0.78,
                              ),
                          itemBuilder: (context, index) {
                            final pet = animais[index];
                            return PetCard(
                              pet: pet,
                              favorito: favoritos.contains(pet.id),
                              onFavorite: () => _alternarFavorito(pet.id),
                            );
                          },
                        );
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
}

class PetCard extends StatelessWidget {
  const PetCard({
    super.key,
    required this.pet,
    required this.favorito,
    required this.onFavorite,
  });

  final Pet pet;
  final bool favorito;
  final VoidCallback onFavorite;

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
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Expanded(
                        child: Text(
                          'Especie: ${pet.especie}',
                          style: const TextStyle(
                            fontSize: 11,
                            color: Color.fromARGB(255, 247, 239, 242),
                          ),
                        ),
                      ),
                      IconButton(
                        onPressed: onFavorite,
                        tooltip: favorito
                            ? 'Remover dos favoritos'
                            : 'Adicionar aos favoritos',
                        constraints: const BoxConstraints(
                          minWidth: 36,
                          minHeight: 36,
                        ),
                        padding: const EdgeInsets.all(4),
                        icon: Icon(
                          favorito ? Icons.favorite : Icons.favorite_border,
                          size: 20,
                          color: favorito
                              ? Colors.red.shade100
                              : const Color.fromARGB(255, 248, 238, 242),
                        ),
                      ),
                    ],
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
