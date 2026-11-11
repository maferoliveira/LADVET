import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_ladvet/ui/configuracaovet.dart';
import 'package:image_picker/image_picker.dart';

const Color rosaFundo = Color(0xFFF3DEDE);
const Color rosa = Color(0xFFD18F92);
const Color azul = Color(0xFF7888B5);
const Color textoEscuro = Color.fromARGB(255, 109, 107, 123);
const Color brancoRosa = Color(0xFFECE2E2);

class CadastrarAnimalPage extends StatefulWidget {
  const CadastrarAnimalPage({super.key});

  @override
  State<CadastrarAnimalPage> createState() =>
      _CadastrarAnimalPageState();
}

class _CadastrarAnimalPageState
    extends State<CadastrarAnimalPage> {
  final _formKey = GlobalKey<FormState>();
  final ImagePicker _imagePicker = ImagePicker();

  final nomeController = TextEditingController();
  final idadeController = TextEditingController();
  final especieController = TextEditingController();
  final racaController = TextEditingController();
  final porteController = TextEditingController();
  final temperamentoController = TextEditingController();
  final descricaoController = TextEditingController();

  File? foto;
  String? sexo;

  @override
  void dispose() {
    nomeController.dispose();
    idadeController.dispose();
    especieController.dispose();
    racaController.dispose();
    porteController.dispose();
    temperamentoController.dispose();
    descricaoController.dispose();
    super.dispose();
  }

  Future<void> selecionarFoto() async {
    final XFile? imagem = await _imagePicker.pickImage(
      source: ImageSource.gallery,
      imageQuality: 80,
    );

    if (imagem != null) {
      setState(() {
        foto = File(imagem.path);
      });
    }
  }

  void cadastrarAnimal() {
    if (!_formKey.currentState!.validate()) return;

    if (sexo == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Selecione o sexo do animal.'),
        ),
      );
      return;
    }

    // Aqui você pode integrar o cadastro com sua API ou banco.
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Animal cadastrado com sucesso!'),
      ),
    );

    Navigator.pop(context);
  }

  Widget campo({
    required String titulo,
    required String dica,
    required TextEditingController controller,
    TextInputType tipo = TextInputType.text,
    int linhas = 1,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          titulo,
          style: const TextStyle(
            color: Colors.white,
            fontSize: 14,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),
        TextFormField(
          controller: controller,
          keyboardType: tipo,
          maxLines: linhas,
          validator: (valor) {
            if (valor == null || valor.trim().isEmpty) {
              return 'Preencha este campo';
            }
            return null;
          },
          style: const TextStyle(
            color: textoEscuro,
            fontSize: 14,
          ),
          decoration: InputDecoration(
            hintText: dica,
            hintStyle: const TextStyle(
              color: Color(0xFF99919A),
              fontSize: 14,
            ),
            filled: true,
            fillColor: Colors.white,
            contentPadding: const EdgeInsets.symmetric(
              horizontal: 15,
              vertical: 15,
            ),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide.none,
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide.none,
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: const BorderSide(
                color: azul,
                width: 2,
              ),
            ),
            errorStyle: const TextStyle(
              color: Colors.white,
            ),
          ),
        ),
      ],
    );
  }

  Widget campoFoto() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Foto',
          style: TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.bold,
            fontSize: 14,
          ),
        ),
        const SizedBox(height: 8),
        InkWell(
          onTap: selecionarFoto,
          borderRadius: BorderRadius.circular(12),
          child: Container(
            width: double.infinity,
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(12),
            ),
            child: Row(
              children: [
                if (foto != null)
                  ClipRRect(
                    borderRadius: BorderRadius.circular(8),
                    child: Image.file(
                      foto!,
                      width: 55,
                      height: 55,
                      fit: BoxFit.cover,
                    ),
                  )
                else
                  const Icon(
                    Icons.add_photo_alternate_outlined,
                    color: azul,
                    size: 32,
                  ),
                const SizedBox(width: 12),
                Expanded(
                  child: Text(
                    foto == null
                        ? 'Escolher foto do animal'
                        : 'Foto selecionada',
                    style: const TextStyle(
                      color: textoEscuro,
                      fontSize: 14,
                    ),
                  ),
                ),
                const Icon(
                  Icons.folder_open_outlined,
                  color: azul,
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget campoSexo() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Sexo',
          style: TextStyle(
            color: Colors.white,
            fontSize: 14,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),
        Row(
          children: [
            Expanded(
              child: botaoSexo('Macho'),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: botaoSexo('Fêmea'),
            ),
          ],
        ),
      ],
    );
  }

  Widget botaoSexo(String valor) {
    final selecionado = sexo == valor;

    return SizedBox(
      height: 52,
      child: OutlinedButton(
        onPressed: () {
          setState(() {
            sexo = valor;
          });
        },
        style: OutlinedButton.styleFrom(
          backgroundColor:
              selecionado ? azul : Colors.white,
          foregroundColor:
              selecionado ? Colors.white : const Color(0xFF72556C),
          side: BorderSide(
            color: selecionado ? const Color.fromARGB(255, 188, 90, 137) : Colors.white,
          ),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        ),
        child: Text(
          valor,
          style: const TextStyle(
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }

  Widget botaoPrincipal({
    required String texto,
    required VoidCallback acao,
    required Color cor,
    Color textoCor = Colors.white,
    Color borda = Colors.transparent,
  }) {
    return SizedBox(
      width: double.infinity,
      height: 54,
      child: OutlinedButton(
        onPressed: acao,
        style: OutlinedButton.styleFrom(
          backgroundColor: cor,
          foregroundColor: textoCor,
          side: BorderSide(color: borda),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15),
          ),
        ),
        child: Text(
          texto,
          style: const TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 16,
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: rosaFundo,
      body: SafeArea(
        child: Stack(
          children: [
            // Conteúdo rolável da página
            SingleChildScrollView(
              padding: const EdgeInsets.fromLTRB(
                18,
                100,
                18,
                25,
              ),
              child: Center(
                child: ConstrainedBox(
                  constraints: const BoxConstraints(
                    maxWidth: 750,
                  ),
                  child: Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(22),
                    decoration: BoxDecoration(
                      color: rosa,
                      borderRadius: BorderRadius.circular(28),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withAlpha(20),
                          blurRadius: 15,
                          offset: const Offset(0, 6),
                        ),
                      ],
                    ),
                    child: Form(
                      key: _formKey,
                      child: Column(
                        crossAxisAlignment:
                            CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'Cadastrar novo animal',
                            style: TextStyle(
                              color: textoEscuro,
                              fontSize: 25,
                              fontWeight: FontWeight.w900,
                            ),
                          ),
                          const SizedBox(height: 25),

                          campoFoto(),

                          const SizedBox(height: 20),

                          // Nome e idade lado a lado
                          Row(
                            crossAxisAlignment:
                                CrossAxisAlignment.start,
                            children: [
                              Expanded(
                                child: campo(
                                  titulo: 'Nome',
                                  dica: 'Nome do animal',
                                  controller: nomeController,
                                ),
                              ),
                              const SizedBox(width: 12),
                              Expanded(
                                child: campo(
                                  titulo: 'Idade',
                                  dica: 'Idade',
                                  controller: idadeController,
                                  tipo: TextInputType.number,
                                ),
                              ),
                            ],
                          ),

                          const SizedBox(height: 18),

                          // Espécie e raça lado a lado
                          Row(
                            crossAxisAlignment:
                                CrossAxisAlignment.start,
                            children: [
                              Expanded(
                                child: campo(
                                  titulo: 'Espécie',
                                  dica: 'Cachorro, gato...',
                                  controller: especieController,
                                ),
                              ),
                              const SizedBox(width: 12),
                              Expanded(
                                child: campo(
                                  titulo: 'Raça',
                                  dica: 'Raça',
                                  controller: racaController,
                                ),
                              ),
                            ],
                          ),

                          const SizedBox(height: 18),

                          // Porte e sexo lado a lado
                          Row(
                            crossAxisAlignment:
                                CrossAxisAlignment.start,
                            children: [
                              Expanded(
                                child: campo(
                                  titulo: 'Porte',
                                  dica: 'Pequeno, médio ou grande',
                                  controller: porteController,
                                ),
                              ),
                              const SizedBox(width: 12),
                              Expanded(
                                child: campoSexo(),
                              ),
                            ],
                          ),

                          const SizedBox(height: 18),

                          // Temperamento em meia linha
                          campo(
                            titulo: 'Temperamento',
                            dica: 'Calmo, brincalhão...',
                            controller: temperamentoController,
                          ),

                          const SizedBox(height: 18),

                          // Descrição ocupando toda a largura
                          campo(
                            titulo: 'Descrição',
                            dica: 'Informações sobre o animal',
                            controller: descricaoController,
                            linhas: 4,
                          ),

                          const SizedBox(height: 25),

                          botaoPrincipal(
                            texto: 'Cadastrar animal',
                            acao: cadastrarAnimal,
                            cor: azul,
                          ),

                          const SizedBox(height: 14),

                          botaoPrincipal(
                            texto: 'Cancelar',
                            acao: () => Navigator.pop(context),
                            cor: rosa,
                            borda: Colors.white,
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ),

            // Cabeçalho fixo com botão de voltar e logo
            Positioned(
              top: 10,
              left: 15,
              child: SizedBox(
                width: 48,
                height: 48,
                child: IconButton(
                  onPressed: () => Navigator.pop(context),
                  icon: const Icon(
                    Icons.reply_rounded,
                    color: Colors.white,
                    size: 30,
                  ),
                  style: IconButton.styleFrom(
                    backgroundColor: rosa,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(14),
                    ),
                  ),
                ),
              ),
            ),

            Positioned(
              top: 8,
              left: 0,
              right: 0,
              child: Center(
                child: Image.asset(
                  'assets/Logo.png',
                  height: 65,
                  fit: BoxFit.contain,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

void main() {
  runApp(
    const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Configuracaovet(),
    ),
  );
}
