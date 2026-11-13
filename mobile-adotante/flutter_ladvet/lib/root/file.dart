import 'dart:io';

import 'package:flutter/foundation.dart';
import 'package:path_provider/path_provider.dart';

abstract class GerenciarArquivo {
  static Future<String> get _caminhoLocal async {
    final diretorio = await getApplicationDocumentsDirectory();
    return diretorio.path;
  }

  static Future<File> get _arquivoLocal async {
    final caminho = await _caminhoLocal;
    return File('$caminho/favoritos.csv');
  }

  static Future<File> salvar(String texto) async {
    if (kIsWeb) {
      throw UnsupportedError(
        'O armazenamento em arquivo está disponível somente no celular.',
      );
    }

    final arquivo = await _arquivoLocal;
    return arquivo.writeAsString(texto, flush: true);
  }

  static Future<String> abrir() async {
    if (kIsWeb) {
      throw UnsupportedError(
        'O armazenamento em arquivo está disponível somente no celular.',
      );
    }

    final arquivo = await _arquivoLocal;
    if (!await arquivo.exists()) {
      return '';
    }
    return arquivo.readAsString();
  }
}
