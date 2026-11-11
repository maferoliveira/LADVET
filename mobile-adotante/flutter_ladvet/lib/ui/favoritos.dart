
import 'package:flutter/material.dart';
import 'package:flutter_ladvet/models/pet.dart';
import 'package:flutter_ladvet/models/pets.dart';

class FavoritosController {
  static final ValueNotifier<Set<int>> ids =
      ValueNotifier<Set<int>>({});

  static void alternar(int id) {
    final novosFavoritos = Set<int>.from(ids.value);

    if (novosFavoritos.contains(id)) {
      novosFavoritos.remove(id);
    } else {
      novosFavoritos.add(id);
    }

    ids.value = novosFavoritos;
  }

  static bool verificar(int id) {
    return ids.value.contains(id);
  }
}

// PÁGINA DE FAVORITOS
class FavoritosPage extends StatelessWidget {
  const FavoritosPage({super.key});

  static const Color rosa = Color(0xFFD18F92);
  static const Color azul = Color(0xFF7B84B8);
  static const Color texto = Color(0xFF57465D);

  static const List<Pet> pets = MockupPets.pets;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: double.infinity,
        height: double.infinity,

        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              Color(0xFFC9B2C0),
              Color(0xFFB8B2CD),
            ],
          ),
        ),

        child: SafeArea(
          child: Column(
            children: [
              // TOPO
              Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: 20,
                  vertical: 12,
                ),

                child: SizedBox(
                  height: 76,
                  child: Stack(
                    alignment: Alignment.center,
                    children: [
                      // BOTÃO VOLTAR
                      Align(
                        alignment: Alignment.centerLeft,
                        child: InkWell(
                          borderRadius: BorderRadius.circular(14),
                          onTap: () {
                            Navigator.pop(context);
                          },
                          child: Container(
                            width: 54,
                            height: 54,
                            decoration: BoxDecoration(
                              color: rosa,
                              borderRadius: BorderRadius.circular(14),
                            ),
                            child: const Icon(
                              Icons.reply_rounded,
                              color: Colors.white,
                              size: 30,
                            ),
                          ),
                        ),
                      ),

                      // LOGO
                      Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const Icon(
                            Icons.pets,
                            color: Color(0xFF8194CE),
                            size: 37,
                          ),
                          const SizedBox(width: 5),
                          const Text(
                            'LAD\nVET',
                            textAlign: TextAlign.center,
                            height: 0.85,
                            style: TextStyle(
                              color: Color(0xFFD47F87),
                              fontSize: 24,
                              fontWeight: FontWeight.w900,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),

              // CONTEÚDO
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 20,
                  ),

                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const SizedBox(height: 25),

                      const Text(
                        'Meus favoritos',
                        style: TextStyle(
                          color: texto,
                          fontSize: 30,
                          fontWeight: FontWeight.bold,
                        ),
                      ),

                      const SizedBox(height: 12),

                      const Text(
                        'Animais que você marcou como favoritos.',
                        style: TextStyle(
                          color: Color(0xFF775E7B),
                          fontSize: 16,
                        ),
                      ),

                      const SizedBox(height: 34),

                      // LISTA DE FAVORITOS
                      Expanded(
                        child: ValueListenableBuilder<Set<int>>(
                          valueListenable: FavoritosController.ids,

                          builder: (context, favoritos, child) {
                            final animaisFavoritos = pets
                                .where(
                                  (pet) => favoritos.contains(pet.id),
                                )
                                .toList();

                            // QUANDO NÃO EXISTIREM FAVORITOS
                            if (animaisFavoritos.isEmpty) {
                              return Center(
                                child: Container(
                                  width: double.infinity,
                                  height: 128,
                                  alignment: Alignment.center,
                                  decoration: BoxDecoration(
                                    color: Colors.white,
                                    borderRadius: BorderRadius.circular(22),
                                    boxShadow: [
                                      BoxShadow(
                                        color: Colors.black.withValues(
                                          alpha: 0.07,
                                        ),
                                        blurRadius: 12,
                                        offset: const Offset(0, 5),
                                      ),
                                    ],
                                  ),
                                  child: const Text(
                                    'Você ainda não possui favoritos.',
                                    textAlign: TextAlign.center,
                                    style: TextStyle(
                                      color: Color(0xFF765B79),
                                      fontSize: 17,
                                    ),
                                  ),
                                ),
                              );
                            }

                            // QUANDO EXISTIREM FAVORITOS
                            return ListView.builder(
                              padding: const EdgeInsets.only(bottom: 20),
                              itemCount: animaisFavoritos.length,

                              itemBuilder: (context, index) {
                                final pet = animaisFavoritos[index];

                                return _CardFavorito(
                                  pet: pet,
                                  onRemove: () {
                                    FavoritosController.alternar(pet.id);
                                  },
                                );
                              },
                            );
                          },
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// CARD DOS ANIMAIS FAVORITADOS
class _CardFavorito extends StatelessWidget {
  const _CardFavorito({
    required this.pet,
    required this.onRemove,
  });

  final Pet pet;
  final VoidCallback onRemove;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 22),

      decoration: BoxDecoration(
        color: const Color.fromARGB(255, 189, 146, 149),
        borderRadius: BorderRadius.circular(22),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.08),
            blurRadius: 8,
            offset: const Offset(0, 3),
          ),
        ],
      ),

      child: Column(
        children: [
          // FOTO DO ANIMAL
          Padding(
            padding: const EdgeInsets.all(12),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(16),
              child: AspectRatio(
                aspectRatio: 1.5,
                child: pet.imagePath != null
                    ? Image.network(
                        pet.imagePath!,
                        width: double.infinity,
                        fit: BoxFit.cover,
                        errorBuilder: (context, error, stackTrace) {
                          return const ColoredBox(
                            color: Colors.white,
                            child: Icon(
                              Icons.pets,
                              size: 60,
                              color: Colors.grey,
                            ),
                          );
                        },
                      )
                    : const ColoredBox(
                        color: Colors.white,
                        child: Icon(
                          Icons.pets,
                          size: 60,
                          color: Colors.grey,
                        ),
                      ),
              ),
            ),
          ),

          // INFORMAÇÕES
          Container(
            width: double.infinity,
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 16),
            decoration: const BoxDecoration(
              color: Color.fromARGB(255, 184, 130, 133),
              borderRadius: BorderRadius.vertical(
                bottom: Radius.circular(22),
              ),
            ),

            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          _InfoFavorito('Nome', pet.nome),
                          _InfoFavorito('Idade', pet.idade),
                          _InfoFavorito('Espécie', pet.especie),
                        ],
                      ),
                    ),

                    IconButton(
                      onPressed: onRemove,
                      icon: const Icon(
                        Icons.favorite,
                        color: Colors.white,
                        size: 27,
                      ),
                      tooltip: 'Remover dos favoritos',
                    ),
                  ],
                ),

                const Divider(color: Colors.white54),

                Text(
                  'Sexo: ${pet.sexo}',
                  style: const TextStyle(color: Colors.white),
                ),

                const SizedBox(height: 8),

                Text(
                  'Vacinas: ${pet.vacinas}',
                  style: const TextStyle(color: Colors.white),
                ),

                const SizedBox(height: 8),

                Text(
                  'Temperamento: ${pet.temperamento}',
                  style: const TextStyle(
                    color: Colors.white,
                    height: 1.4,
                  ),
                ),

                const SizedBox(height: 8),

                Text(
                  pet.descricao,
                  style: const TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                    height: 1.4,
                  ),
                ),

                const SizedBox(height: 10),

                Center(
                  child: Text(
                    pet.status,
                    style: const TextStyle(
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
    );
  }
}

// INFORMAÇÕES DO CARD
class _InfoFavorito extends StatelessWidget {
  const _InfoFavorito(this.label, this.value);

  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 4),
      child: Text(
        '$label: $value',
        style: const TextStyle(
          color: Colors.white,
          fontSize: 14,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }
}
