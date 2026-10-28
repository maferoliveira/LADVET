
import 'package:flutter/material.dart';
import 'package:flutter_ladvet/ui/contato.dart';

const Color rosaFundo = Color(0xFFF3DEDE);
const Color rosa = Color(0xFFD18F92);
const Color azul = Color(0xFF2D3E68);
const Color textoEscuro = Color(0xFF814D4D);
const Color brancoRosa = Color(0xFFECE2E2);

class ConfiguracaoPage extends StatefulWidget {
  const ConfiguracaoPage({super.key});

  @override
  State<ConfiguracaoPage> createState() =>
      _ConfiguracaoPageState();
}

class _ConfiguracaoPageState extends State<ConfiguracaoPage> {
  final _formKey = GlobalKey<FormState>();

  final nomeController =
      TextEditingController(text: 'Marina Defendi');
  final emailController =
      TextEditingController(text: 'marinadefendi771@gmail.com');
  final telefoneController =
      TextEditingController(text: '19994521154');
  final cidadeController =
      TextEditingController(text: 'Pedreira');
  final cepController = TextEditingController();
  final enderecoController = TextEditingController();
  final bairroController = TextEditingController();
  final numeroController = TextEditingController();
  final residenciaController = TextEditingController();
  final espacoController = TextEditingController();
  final experienciaController = TextEditingController();
  final rotinaController = TextEditingController();
  final crmvController = TextEditingController(text: '4877');

  @override
  void dispose() {
    nomeController.dispose();
    emailController.dispose();
    telefoneController.dispose();
    cidadeController.dispose();
    cepController.dispose();
    enderecoController.dispose();
    bairroController.dispose();
    numeroController.dispose();
    residenciaController.dispose();
    espacoController.dispose();
    experienciaController.dispose();
    rotinaController.dispose();
    crmvController.dispose();
    super.dispose();
  }

  Widget campo(
    String titulo,
    TextEditingController controller, {
    bool somenteLeitura = false,
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
        const SizedBox(height: 7),
        TextFormField(
          controller: controller,
          readOnly: somenteLeitura,
          style: const TextStyle(
            color: Color(0xFF303030),
            fontSize: 14,
          ),
          decoration: InputDecoration(
            filled: true,
            fillColor: somenteLeitura
                ? const Color(0xFFEEEEEE)
                : Colors.white,
            contentPadding: const EdgeInsets.symmetric(
              horizontal: 15,
              vertical: 15,
            ),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(22),
              borderSide: BorderSide.none,
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(22),
              borderSide: BorderSide.none,
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(22),
              borderSide: const BorderSide(
                color: azul,
                width: 1.5,
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget botao(String texto, VoidCallback acao) {
    return SizedBox(
      width: double.infinity,
      height: 53,
      child: ElevatedButton(
        onPressed: acao,
        style: ButtonStyle(
          backgroundColor:
              WidgetStateProperty.resolveWith<Color>((states) {
            if (states.contains(WidgetState.hovered)) {
              return rosa;
            }
            return brancoRosa;
          }),
          foregroundColor:
              WidgetStateProperty.resolveWith<Color>((states) {
            if (states.contains(WidgetState.hovered)) {
              return Colors.white;
            }
            return textoEscuro;
          }),
          elevation: const WidgetStatePropertyAll(0),
          shape: WidgetStatePropertyAll(
            RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(22),
            ),
          ),
        ),
        child: Text(
          texto,
          textAlign: TextAlign.center,
          style: const TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 14,
          ),
        ),
      ),
    );
  }

  void salvar() {
    if (_formKey.currentState!.validate()) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Alterações salvas nesta tela!'),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: rosaFundo,
      body: SafeArea(
        child: Column(
          children: [
            SizedBox(
              height: 76,
              child: Stack(
                children: [
                  Positioned(
                    left: 16,
                    top: 14,
                    child: Material(
                      color: rosa,
                      borderRadius: BorderRadius.circular(15),
                      child: InkWell(
                        borderRadius: BorderRadius.circular(15),
                        onTap: () => Navigator.pop(context),
                        child: const SizedBox(
                          width: 48,
                          height: 48,
                          child: Icon(
                            Icons.reply,
                            color: Colors.white,
                            size: 30,
                          ),
                        ),
                      ),
                    ),
                  ),
                  const Positioned(
                    right: 16,
                    top: 18,
                    child: Text(
                      '⌂ LAD\n   VET',
                      textAlign: TextAlign.right,
                      style: TextStyle(
                        color: rosa,
                        fontSize: 22,
                        fontWeight: FontWeight.w900,
                        height: 0.9,
                      ),
                    ),
                  ),
                ],
              ),
            ),

            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(
                  horizontal: 10,
                  vertical: 7,
                ),
                child: Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    color: rosa,
                    borderRadius: BorderRadius.circular(28),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withValues(alpha: 0.04),
                        blurRadius: 5,
                        offset: const Offset(0, 2),
                      ),
                    ],
                  ),
                  child: Form(
                    key: _formKey,
                    child: Column(
                      children: [
                        const Text(
                          'Meu perfil',
                          style: TextStyle(
                            color: textoEscuro,
                            fontSize: 26,
                            fontWeight: FontWeight.w900,
                          ),
                        ),
                        const SizedBox(height: 25),

                        Row(
                          crossAxisAlignment:
                              CrossAxisAlignment.start,
                          children: [
                            Expanded(
                              child: campo(
                                'Nome',
                                nomeController,
                              ),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: campo(
                                'Email',
                                emailController,
                                somenteLeitura: true,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 17),

                        Row(
                          crossAxisAlignment:
                              CrossAxisAlignment.start,
                          children: [
                            Expanded(
                              child: campo(
                                'Telefone',
                                telefoneController,
                              ),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: campo(
                                'Cidade',
                                cidadeController,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 17),

                        Row(
                          crossAxisAlignment:
                              CrossAxisAlignment.start,
                          children: [
                            Expanded(
                              child: campo(
                                'CEP',
                                cepController,
                              ),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: campo(
                                'Endereço',
                                enderecoController,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 17),

                        Row(
                          crossAxisAlignment:
                              CrossAxisAlignment.start,
                          children: [
                            Expanded(
                              child: campo(
                                'Bairro',
                                bairroController,
                              ),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: campo(
                                'Número',
                                numeroController,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 17),

                        Row(
                          crossAxisAlignment:
                              CrossAxisAlignment.start,
                          children: [
                            Expanded(
                              child: campo(
                                'Residência',
                                residenciaController,
                              ),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: campo(
                                'Espaço',
                                espacoController,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 17),

                        Row(
                          crossAxisAlignment:
                              CrossAxisAlignment.start,
                          children: [
                            Expanded(
                              child: campo(
                                'Experiência com animais',
                                experienciaController,
                              ),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: campo(
                                'Rotina',
                                rotinaController,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 17),

                        Row(
                          crossAxisAlignment:
                              CrossAxisAlignment.start,
                          children: [
                            Expanded(
                              child: campo(
                                'CRMV',
                                crmvController,
                                somenteLeitura: true,
                              ),
                            ),
                            const SizedBox(width: 12),
                            const Expanded(
                              child: SizedBox(),
                            ),
                          ],
                        ),

                        const SizedBox(height: 25),

                        SizedBox(
                          width: double.infinity,
                          height: 58,
                          child: ElevatedButton(
                            onPressed: salvar,
                            style: ElevatedButton.styleFrom(
                              backgroundColor: azul,
                              foregroundColor: Colors.white,
                              elevation: 0,
                              shape: RoundedRectangleBorder(
                                borderRadius:
                                    BorderRadius.circular(17),
                              ),
                            ),
                            child: const Text(
                              'Salvar alterações',
                              style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ),

                        const SizedBox(height: 25),

                        LayoutBuilder(
                          builder: (context, constraints) {
                            final botoes = [
                              botao('Meus favoritos', () {}),

                              botao('Contatos', () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) =>
                                        const ContatosPage(),
                                  ),
                                );
                              }),

                              botao('Nossa história', () {}),
                              botao('Configurações', () {}),
                            ];

                            return Column(
                              children: [
                                for (
                                  int i = 0;
                                  i < botoes.length;
                                  i += 2
                                )
                                  Padding(
                                    padding:
                                        const EdgeInsets.only(
                                      bottom: 12,
                                    ),
                                    child: Row(
                                      children: [
                                        Expanded(
                                          child: botoes[i],
                                        ),
                                        const SizedBox(width: 10),
                                        Expanded(
                                          child: botoes[i + 1],
                                        ),
                                      ],
                                    ),
                                  ),
                              ],
                            );
                          },
                        ),

                        const SizedBox(height: 5),

                        SizedBox(
                          width: 220,
                          child: botao('Sair', () {
                            Navigator.pop(context);
                          }),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
