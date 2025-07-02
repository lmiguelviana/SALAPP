import 'package:flutter/material.dart';
import 'package:salaapp/models/gt.dart';
import 'package:salaapp/services/api_service.dart';
import 'package:salaapp/screens/gt_details_screen.dart';

class GtsListScreen extends StatefulWidget {
  const GtsListScreen({super.key});

  @override
  State<GtsListScreen> createState() => _GtsListScreenState();
}

class _GtsListScreenState extends State<GtsListScreen> {
  final ApiService _apiService = ApiService();
  List<Gt> _gts = [];
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _fetchGts();
  }

  Future<void> _fetchGts() async {
    try {
      final gts = await _apiService.fetchGts();
      setState(() {
        _gts = gts;
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
        title: const Text('Grupos de Trabalho', style: TextStyle(color: Colors.amber)),
        centerTitle: true,
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator(color: Colors.amber))
          : _error != null
              ? Center(child: Text('Erro: $_error', style: const TextStyle(color: Colors.red)))
              : _gts.isEmpty
                  ? const Center(child: Text('Nenhum GT disponível.', style: TextStyle(color: Colors.white70)))
                  : ListView.builder(
                      padding: const EdgeInsets.all(16.0),
                      itemCount: _gts.length,
                      itemBuilder: (context, index) {
                        final gt = _gts[index];
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
                                  gt.title,
                                  style: Theme.of(context).textTheme.titleMedium?.copyWith(color: Colors.amber, fontWeight: FontWeight.bold),
                                ),
                                const SizedBox(height: 8.0),
                                Text(
                                  'Apresentador: ${gt.presenterName}',
                                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Colors.white70),
                                ),
                                Text(
                                  'Dia: ${gt.gtDate} - Horário: ${gt.gtTime}',
                                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Colors.white70),
                                ),
                                const SizedBox(height: 8.0),
                                Text(
                                  gt.description,
                                  style: Theme.of(context).textTheme.bodySmall?.copyWith(color: Colors.white54),
                                  maxLines: 2,
                                  overflow: TextOverflow.ellipsis,
                                ),
                                const SizedBox(height: 16.0),
                                Align(
                                  alignment: Alignment.centerRight,
                                  child: ElevatedButton(
                                    onPressed: () {
                                      Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                          builder: (context) => GtDetailsScreen(gt: gt),
                                        ),
                                      );
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