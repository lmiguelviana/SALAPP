import 'package:flutter/material.dart';
import 'package:salaapp/models/gt.dart';

class GtDetailsScreen extends StatelessWidget {
  final Gt gt;

  const GtDetailsScreen({super.key, required this.gt});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(gt.title, style: const TextStyle(color: Colors.amber)),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Text(
              gt.title,
              style: Theme.of(context).textTheme.headlineMedium?.copyWith(color: Colors.white, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16.0),
            Text(
              gt.description,
              style: Theme.of(context).textTheme.bodyLarge?.copyWith(color: Colors.white70),
            ),
            const SizedBox(height: 16.0),
            Text(
              'Apresentador: ${gt.presenterName}',
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Colors.white),
            ),
            Text(
              'Data: ${gt.gtDate}',
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Colors.white),
            ),
            Text(
              'Horário: ${gt.gtTime}',
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Colors.white),
            ),
            Text(
              'Categoria: ${gt.category}',
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Colors.white),
            ),
            const SizedBox(height: 24.0),

            SizedBox(
              width: double.infinity,
              child: ElevatedButton.icon(
                onPressed: () {
                  // Lógica para abrir o link do Zoom
                  print('Abrir Zoom: ${gt.zoomLink}');
                },
                icon: const Icon(Icons.videocam, color: Colors.black),
                label: const Text('Participar via Zoom', style: TextStyle(color: Colors.black)),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.amber,
                  padding: const EdgeInsets.symmetric(vertical: 16.0),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8.0),
                  ),
                ),
              ),
            ),
            const SizedBox(height: 32.0),

            // Área de Comentários (Placeholder por enquanto)
            Text(
              'Comentários',
              style: Theme.of(context).textTheme.headlineSmall?.copyWith(color: Colors.amber, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16.0),
            Container(
              padding: const EdgeInsets.all(16.0),
              decoration: BoxDecoration(
                color: Colors.grey[900],
                borderRadius: BorderRadius.circular(12.0),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Nenhum comentário ainda. Seja o primeiro a comentar!',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Colors.white70),
                  ),
                  const SizedBox(height: 16.0),
                  TextField(
                    decoration: InputDecoration(
                      hintText: 'Deixe seu comentário...',
                      hintStyle: const TextStyle(color: Colors.white70),
                      filled: true,
                      fillColor: Colors.grey[800],
                      enabledBorder: OutlineInputBorder(
                        borderSide: const BorderSide(color: Colors.amber, width: 1.0),
                        borderRadius: BorderRadius.circular(8.0),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderSide: const BorderSide(color: Colors.amberAccent, width: 2.0),
                        borderRadius: BorderRadius.circular(8.0),
                      ),
                    ),
                    style: const TextStyle(color: Colors.white),
                    maxLines: 3,
                  ),
                  const SizedBox(height: 16.0),
                  Align(
                    alignment: Alignment.centerRight,
                    child: ElevatedButton(
                      onPressed: () {
                        print('Enviar Comentário');
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.amber,
                      ),
                      child: const Text('Enviar', style: TextStyle(color: Colors.black)),
                    ),
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
