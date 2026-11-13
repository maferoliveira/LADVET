import 'package:flutter/material.dart';
import 'package:flutter_ladvet/models/pet.dart';
import 'package:flutter_ladvet/models/pets.dart';
import 'package:flutter_ladvet/root/file.dart';

// CONTROLE DE FAVORITOS
class FavoritosController {
  static final ValueNotifier<Set<int>> ids = ValueNotifier<Set<int>>({});
  static Future<void> _gravacoesPendentes = Future<void>.value();

  static Future<void> inicializar() async {
    final conteudo = await GerenciarArquivo.abrir();
    final favoritos = conteudo
        .split(RegExp(r'[,;\s]+'))
        .map(int.tryParse)
        .whereType<int>()
        .where((id) => id > 0)
        .toSet();
    ids.value = favoritos;
  }

  static Future<void> alternar(int id) {
    final novosFavoritos = Set<int>.from(ids.value);

    if (novosFavoritos.contains(id)) {
      novosFavoritos.remove(id);
    } else {
      novosFavoritos.add(id);
    }

    ids.value = novosFavoritos;

    final conteudo = (novosFavoritos.toList()..sort()).join(',');
    final gravacao = _gravacoesPendentes
        .then((_) => GerenciarArquivo.salvar(conteudo))
        .then<void>((_) {});
    _gravacoesPendentes = gravacao.then<void>(
      (_) {},
      onError: (Object error, StackTrace stackTrace) {},
    );
    return gravacao;
  }

  static bool verificar(int id) {
    return ids.value.contains(id);
  }
}

// PÁGINA DE FAVORITOS
class FavoritosPage extends StatefulWidget {
  const FavoritosPage({super.key});

  @override
  State<FavoritosPage> createState() => _FavoritosPageState();
}

class _FavoritosPageState extends State<FavoritosPage> {
  bool _somenteFavoritas = true;

  Future<void> _removerFavorito(int id) async {
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

  void filtroFavoritas(bool somenteFavoritas) {
    setState(() {
      _somenteFavoritas = somenteFavoritas;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFFBE4E4),

      appBar: AppBar(
        backgroundColor: const Color.fromARGB(255, 217, 176, 178),
        elevation: 0,
        centerTitle: true,
        title: Image.asset(
          'assets/logo.png',
          width: 155,
          height: 76,
          fit: BoxFit.contain,
          errorBuilder: (context, error, stackTrace) {
            return const Text(
              'LAD VET',
              style: TextStyle(
                color: Color(0xFF4B1528),
                fontWeight: FontWeight.bold,
                fontSize: 24,
              ),
            );
          },
        ),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Color(0xFF4B1528)),
          onPressed: () => Navigator.pop(context),
        ),
      ),

      body: Column(
        children: [
          const SizedBox(height: 20),

          const Text(
            'MEUS FAVORITOS',
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: Color(0xFF814D4D),
            ),
          ),

          const SizedBox(height: 15),

          // BOTÃO DE FILTRO
          ElevatedButton(
            onPressed: () => filtroFavoritas(!_somenteFavoritas),
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFFD18F92),
              foregroundColor: Colors.white,
              padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 12),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(20),
              ),
            ),
            child: Text(
              _somenteFavoritas ? 'TODOS OS ANIMAIS' : 'FAVORITAS',
              style: const TextStyle(fontWeight: FontWeight.bold),
            ),
          ),

          const SizedBox(height: 15),

          // LISTA DE ANIMAIS
          Expanded(
            child: ValueListenableBuilder<Set<int>>(
              valueListenable: FavoritosController.ids,
              builder: (context, favoritos, child) {
                final animaisFiltrados = MockupPets.pets.where((pet) {
                  return !_somenteFavoritas || favoritos.contains(pet.id);
                }).toList();

                if (animaisFiltrados.isEmpty) {
                  return Center(
                    child: Text(
                      _somenteFavoritas
                          ? 'Você ainda não possui animais favoritos!'
                          : 'Nenhum animal cadastrado.',
                      textAlign: TextAlign.center,
                      style: const TextStyle(
                        fontSize: 16,
                        color: Color(0xFF814D4D),
                      ),
                    ),
                  );
                }

                return ListView.builder(
                  padding: const EdgeInsets.all(16),
                  itemCount: animaisFiltrados.length,
                  itemBuilder: (context, index) {
                    final pet = animaisFiltrados[index];

                    return PetFavoriteCard(
                      pet: pet,
                      onRemove: () => _removerFavorito(pet.id),
                    );
                  },
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

// CARD DOS ANIMAIS FAVORITADOS
class PetFavoriteCard extends StatelessWidget {
  final Pet pet;
  final VoidCallback onRemove;

  const PetFavoriteCard({super.key, required this.pet, required this.onRemove});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(18),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.08),
            blurRadius: 5,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Row(
          children: [
            ClipRRect(
              borderRadius: BorderRadius.circular(12),
              child: SizedBox(
                width: 100,
                height: 100,
                child: pet.imagePath != null && pet.imagePath!.isNotEmpty
                    ? Image.network(
                        pet.imagePath!,
                        fit: BoxFit.cover,
                        errorBuilder: (context, error, stackTrace) {
                          return const Icon(
                            Icons.pets,
                            size: 45,
                            color: Color(0xFFD18F92),
                          );
                        },
                      )
                    : const Icon(
                        Icons.pets,
                        size: 45,
                        color: Color(0xFFD18F92),
                      ),
              ),
            ),

            const SizedBox(width: 14),

            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    pet.nome,
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF814D4D),
                    ),
                  ),

                  const SizedBox(height: 5),

                  Text(
                    pet.especie,
                    style: const TextStyle(fontSize: 14, color: Colors.black54),
                  ),

                  const SizedBox(height: 5),

                  Text(
                    pet.idade,
                    style: const TextStyle(fontSize: 14, color: Colors.black54),
                  ),
                ],
              ),
            ),

            IconButton(
              onPressed: onRemove,
              icon: const Icon(
                Icons.favorite,
                color: Color(0xFFFF5B91),
                size: 28,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
