import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:salaapp/models/gt.dart';
import 'package:salaapp/models/encontro.dart';
import 'package:salaapp/models/post.dart';
import 'package:salaapp/models/user.dart'; // Importar o modelo User
import 'package:shared_preferences/shared_preferences.dart';

class ApiService {
  static const String baseUrl = 'http://localhost:3000/api'; // URL da sua API Node.js

  Future<String?> login(String email, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/users/login'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'email': email,
        'password': password,
      }),
    );

    // --- ADICIONE ESTAS LINHAS PARA DEBUG ---
    print('Login API Response Status Code: ${response.statusCode}');
    print('Login API Response Body: ${response.body}');
    // ---------------------------------------

    if (response.statusCode == 200) {
      final Map<String, dynamic> responseBody = json.decode(response.body);
      final String? token = responseBody['token']; // Agora o token pode ser nulo
      if (token == null) {
        throw Exception('Token de autenticação não recebido da API.');
      }
      final SharedPreferences prefs = await SharedPreferences.getInstance();
      await prefs.setString('jwt_token', token);
      return token;
    } else {
      final Map<String, dynamic> errorBody = json.decode(response.body);
      throw Exception(errorBody['message'] ?? 'Falha no login');
    }
  }

  Future<List<Gt>> fetchGts() async {
    final response = await http.get(Uri.parse('$baseUrl/gts'));

    if (response.statusCode == 200) {
      List jsonResponse = json.decode(response.body);
      return jsonResponse.map((gt) => Gt.fromJson(gt)).toList();
    } else {
      throw Exception('Failed to load GTs');
    }
  }

  Future<List<Encontro>> fetchEncontros() async {
    final response = await http.get(Uri.parse('$baseUrl/encontros'));

    if (response.statusCode == 200) {
      List jsonResponse = json.decode(response.body);
      return jsonResponse.map((encontro) => Encontro.fromJson(encontro)).toList();
    } else {
      throw Exception('Failed to load Encontros');
    }
  }

  Future<List<Post>> fetchPosts() async {
    final response = await http.get(Uri.parse('$baseUrl/posts'));

    if (response.statusCode == 200) {
      List jsonResponse = json.decode(response.body);
      return jsonResponse.map((post) => Post.fromJson(post)).toList();
    } else {
      throw Exception('Failed to load posts');
    }
  }

  Future<User> fetchUserProfile() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    final String? token = prefs.getString('jwt_token');

    if (token == null) {
      throw Exception('Token JWT não encontrado. Usuário não autenticado.');
    }

    final response = await http.get(
      Uri.parse('$baseUrl/users/profile'), // Assumindo um endpoint /users/profile na API
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer $token', // Envia o token JWT no cabeçalho
      },
    );

    if (response.statusCode == 200) {
      return User.fromJson(json.decode(response.body));
    } else if (response.statusCode == 401) {
      throw Exception('Não autorizado. Token inválido ou expirado.');
    } else {
      final Map<String, dynamic> errorBody = json.decode(response.body);
      throw Exception(errorBody['message'] ?? 'Falha ao carregar perfil do usuário');
    }
  }
}