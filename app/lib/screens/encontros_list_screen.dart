import 'package:flutter/material.dart';
import 'package:salaapp/models/encontro.dart';
import 'package:salaapp/services/api_service.dart';

class EncontrosListScreen extends StatefulWidget {
  const EncontrosListScreen({super.key});

  @override
  State<EncontrosListScreen> createState() => _EncontrosListScreenState();
}

class _EncontrosListScreenState extends State<EncontrosListScreen> {
  final ApiService _apiService = ApiService();
  List<Encontro> _encontros = [];
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _fetchEncontros();
  }

  Future<void> _fetchEncontros() async {
    try {
      final encontros = await _apiService.fetchEncontros();
      setState(() {
        _encontros = encontros;
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _error = e.toString();
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Encontros da Sala', style: TextStyle(color: Colors.amber)),
        centerTitle: true,
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator(color: Colors.amber))
          : _error != null
              ? Center(child: Text('Erro: $_error', style: const TextStyle(color: Colors.red)))
              : _encontros.isEmpty
                  ? const Center(child: Text('Nenhum Encontro disponível.', style: TextStyle(color: Colors.white70)))
                  : ListView.builder(
                      padding: const EdgeInsets.all(16.0),
                      itemCount: _encontros.length,
                      itemBuilder: (context, index) {
                        final encontro = _encontros[index];
                        return Card(
                          color: Colors.grey[900], // Fundo do card escuro
                          margin: const EdgeInsets.only(bottom: 16.0),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12.0),
                          ),
                          child: Padding(
                            padding: const EdgeInsets.all(16.0),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  encontro.title,
                                  style: Theme.of(context).textTheme.titleMedium?.copyWith(color: Colors.amber, fontWeight: FontWeight.bold),
                                ),
                                const SizedBox(height: 8.0),
                                Text(
                                  'Data: ${encontro.eventDate}',
                                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Colors.white70),
                                ),
                                Text(
                                  'Local: ${encontro.location}',
                                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Colors.white70),
                                ),
                                const SizedBox(height: 8.0),
                                Text(
                                  encontro.description,
                                  style: Theme.of(context).textTheme.bodySmall?.copyWith(color: Colors.white54),
                                  maxLines: 2,
                                  overflow: TextOverflow.ellipsis,
                                ),
                                const SizedBox(height: 16.0),
                                Align(
                                  alignment: Alignment.centerRight,
                                  child: ElevatedButton(
                                    onPressed: () {
                                      // Lógica para ver detalhes do Encontro
                                    },
                                    style: ElevatedButton.styleFrom(
                                      backgroundColor: Colors.amber, // Botão dourado
                                    ),
                                    child: const Text('Ver Detalhes', style: TextStyle(color: Colors.black)), // Texto preto
                                  ),
                                ),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
    );
  }
}