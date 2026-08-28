import 'package:flutter/material.dart';

import '../models/pet.dart';
import 'cards.dart';

class AdocaoPage extends StatelessWidget {
  const AdocaoPage({super.key});

  static const List<Pet> pets = [
    Pet(
      nome: 'Tulipa',
      idade: '10 anos',
      especie: 'Canino',
      icon: Icons.pets,
      imagePath: 'tulipa.png',
    ),
    Pet(
      nome: 'Thor',
      idade: '8 anos',
      especie: 'Canino',
      icon: Icons.pets,
      imagePath: 'thor.png',
    ),
    Pet(
      nome: 'Pretinho',
      idade: '5 anos',
      especie: 'Canino',
      icon: Icons.pets,
      imagePath: 'pretinho.png',
    ),
    Pet(
      nome: 'Nina',
      idade: '3 anos',
      especie: 'Canino',
      icon: Icons.pets,
      imagePath: 'nina.png',
    ),
    Pet(
      nome: 'Meggie',
      idade: '8 anos',
      especie: 'Canino',
      icon: Icons.pets,
      imagePath: 'meggie.png',
    ),
    Pet(
      nome: 'Salsicha',
      idade: '3 anos',
      especie: 'Canino',
      icon: Icons.pets,
      imagePath: 'salsicha.jpg',
    ),
    Pet(
      nome: 'Duck',
      idade: '2 anos',
      especie: 'Felino',
      icon: Icons.pets,
      imagePath: 'duck.png',
    ),
    Pet(
      nome: 'Fred',
      idade: '3 anos',
      especie: 'Canino',
      icon: Icons.pets,
      imagePath: 'fred.png',
    ),
    Pet(
      nome: 'Jady',
      idade: '4 anos',
      especie: 'Canino',
      icon: Icons.pets,
      imagePath: 'jady.png',
    ),
    Pet(
      nome: 'Theo',
      idade: '2 anos',
      especie: 'Felino',
      icon: Icons.pets,
      imagePath: 'theo.png',
    ),
    Pet(
      nome: 'Aurora',
      idade: '1 ano',
      especie: 'Felino',
      icon: Icons.pets,
      imagePath: 'aurora.jpg',
    ),
    Pet(
      nome: 'Romeu',
      idade: '1 ano',
      especie: 'Felino',
      icon: Icons.pets,
      imagePath: 'romeu.jpg',
    ),
  ];

  static const Color headerColor = Color.fromARGB(255, 217, 161, 159);
  static const Color cardColor = Color.fromARGB(255, 182, 119, 117);
  static const Color textColor = Color(0xFF4B1528);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFFBEAF0),
      body: SafeArea(
        child: Column(
          children: [
            Container(
              color: headerColor,
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
              child: const Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Icon(
                    Icons.account_circle_outlined,
                    color: Colors.white,
                    size: 26,
                  ),
                  Text(
                    'LADVET',
                    style: TextStyle(
                      color: Color(0xFFFBEAF0),
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                      letterSpacing: 0.5,
                    ),
                  ),
                ],
              ),
            ),
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(12),
                child: Column(
                  children: [
                    GridView.builder(
                      shrinkWrap: true,
                      physics: const NeverScrollableScrollPhysics(),
                      itemCount: pets.length,
                      gridDelegate:
                          const SliverGridDelegateWithFixedCrossAxisCount(
                            crossAxisCount: 2,
                            crossAxisSpacing: 10,
                            mainAxisSpacing: 10,
                            childAspectRatio: 0.78,
                          ),
                      itemBuilder: (context, index) {
                        return PetCard(pet: pets[index]);
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
  final Pet pet;

  const PetCard({super.key, required this.pet});

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
                        onTap: () => Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) =>
                                PetAdoptionCardScreen(pet: pet),
                          ),
                        ),
                        child: Image.asset(pet.imagePath!, fit: BoxFit.cover),
                      )
                    : Container(
                        color: AdocaoPage.headerColor,
                        alignment: Alignment.center,
                        child: Icon(
                          pet.icon,
                          size: 34,
                          color: Color(0xFFFBEAF0),
                        ),
                      ),
              ),
            ),
            Padding(
              padding: EdgeInsets.all(8),
              child: Stack(
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Nome: ${pet.nome}',
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w600,
                          color: Color.fromARGB(255, 249, 242, 244),
                        ),
                      ),
                      SizedBox(height: 2),
                      Text(
                        'Idade: ${pet.idade}',
                        style: TextStyle(
                          fontSize: 11,
                          color: Color.fromARGB(255, 245, 234, 238),
                        ),
                      ),
                      SizedBox(height: 2),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            'Especie: ${pet.especie}',
                            style: TextStyle(
                              fontSize: 11,
                              color: Color.fromARGB(255, 247, 239, 242),
                            ),
                          ),
                          GestureDetector(
                            onTap: () {},
                            child: Icon(
                              Icons.favorite_border,
                              size: 14,
                              color: Color.fromARGB(255, 248, 238, 242),
                            ),
                          ),
                        ],
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
