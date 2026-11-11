
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';


const Color rosaFundo = Color(0xFFEADDDD);
const Color rosa = Color(0xFFD18F92);
const Color rosaIcone = Color(0xFFFF5B91);
const Color cinzaCampo = Color(0xFFEEEEEE);

class ConfiguracoesContaPage extends StatefulWidget {
  const ConfiguracoesContaPage({super.key});

  @override
  State<ConfiguracoesContaPage> createState() =>
      _ConfiguracoesContaPageState();
}

class _ConfiguracoesContaPageState extends State<ConfiguracoesContaPage> {
  final TextEditingController nomeController =
      TextEditingController();

  final TextEditingController emailController =
      TextEditingController();

  final TextEditingController telefoneController =
      TextEditingController();

  File? imagemSelecionada;

  Future<void> selecionarImagem() async {
    final ImagePicker picker = ImagePicker();

    final XFile? imagem = await picker.pickImage(
      source: ImageSource.gallery,
    );

    if (imagem != null) {
      setState(() {
        imagemSelecionada = File(imagem.path);
      });
    }
  }

  Widget campoTexto({
    required String hint,
    required TextEditingController controller,
    TextInputType tipo = TextInputType.text,
  }) {
    return Container(
      height: 60,
      decoration: BoxDecoration(
        color: cinzaCampo,
        borderRadius: BorderRadius.circular(16),
      ),
      child: TextField(
        controller: controller,
        keyboardType: tipo,
        decoration: InputDecoration(
          hintText: hint,
          hintStyle: const TextStyle(
            color: Color(0xFF888888),
            fontSize: 14,
          ),
          contentPadding: const EdgeInsets.symmetric(
            horizontal: 16,
            vertical: 20,
          ),
          border: InputBorder.none,
        ),
      ),
    );
  }

  @override
  void dispose() {
    nomeController.dispose();
    emailController.dispose();
    telefoneController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: rosaFundo,

      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.symmetric(
              horizontal: 20,
              vertical: 20,
            ),
            child: Container(
              width: double.infinity,
              constraints: const BoxConstraints(
                maxWidth: 540,
              ),
              padding: const EdgeInsets.symmetric(
                horizontal: 30,
                vertical: 35,
              ),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(22),
              ),

              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [

                  // BOTÃO VOLTAR
                  Align(
                    alignment: Alignment.centerLeft,
                    child: SizedBox(
                      width: 65,
                      height: 44,
                      child: ElevatedButton(
                        onPressed: () {
                          Navigator.pop(context);
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: rosa,
                          foregroundColor: Colors.white,
                          elevation: 0,
                          padding: EdgeInsets.zero,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(14),
                          ),
                        ),
                        child: const Icon(
                          Icons.reply_rounded,
                          size: 21,
                        ),
                      ),
                    ),
                  ),

                  const SizedBox(height: 24),

                  // TÍTULO
                  const Text(
                    'Configurações da conta',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: 26,
                      fontWeight: FontWeight.bold,
                      color: rosa,
                    ),
                  ),

                  const SizedBox(height: 32),

                  // FOTO DE PERFIL
                  GestureDetector(
                    onTap: selecionarImagem,
                    child: Container(
                      width: 138,
                      height: 138,
                      decoration: const BoxDecoration(
                        shape: BoxShape.circle,
                        gradient: LinearGradient(
                          colors: [
                            Color(0xFFFFD6E4),
                            Color(0xFFFFB5D0),
                          ],
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                        ),
                      ),
                      child: ClipOval(
                        child: imagemSelecionada != null
                            ? Image.file(
                                imagemSelecionada!,
                                fit: BoxFit.cover,
                              )
                            : const Icon(
                                Icons.person_outline_rounded,
                                color: rosaIcone,
                                size: 105,
                              ),
                      ),
                    ),
                  ),

                  const SizedBox(height: 26),

                  // SELECIONAR ARQUIVO
                  GestureDetector(
                    onTap: selecionarImagem,
                    child: Container(
                      width: double.infinity,
                      height: 60,
                      padding: const EdgeInsets.symmetric(
                        horizontal: 16,
                      ),
                      decoration: BoxDecoration(
                        color: cinzaCampo,
                        borderRadius: BorderRadius.circular(16),
                      ),
                      child: const Row(
                        children: [
                          Icon(
                            Icons.upload_file_rounded,
                            color: Color(0xFF777777),
                          ),
                          SizedBox(width: 12),
                          Text(
                            'Escolher arquivo',
                            style: TextStyle(
                              color: Color(0xFF555555),
                              fontSize: 14,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),

                  const SizedBox(height: 18),

                  // NOME
                  campoTexto(
                    hint: 'Nome completo',
                    controller: nomeController,
                  ),

                  const SizedBox(height: 20),

                  // EMAIL
                  campoTexto(
                    hint: 'Email',
                    controller: emailController,
                    tipo: TextInputType.emailAddress,
                  ),

                  const SizedBox(height: 20),

                  // TELEFONE
                  campoTexto(
                    hint: 'Telefone',
                    controller: telefoneController,
                    tipo: TextInputType.phone,
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
