## Como Testar a API da Sala do Mestres

Para testar as APIs, você pode usar ferramentas como **Postman**, **Insomnia** ou **`curl` (linha de comando)**.

**Certifique-se de que o servidor Node.js esteja rodando** (`node server.js` na pasta `api`).

--- 

### **Exemplos de Teste com `curl`**

**1. Registrar um Novo Usuário (`POST /api/users/register`)**

```bash
curl -X POST -H "Content-Type: application/json" -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
}' http://localhost:3000/api/users/register
```

**2. Fazer Login (`POST /api/users/login`)**

```bash
curl -X POST -H "Content-Type: application/json" -d '{
    "username": "testuser",
    "password": "password123"
}' http://localhost:3000/api/users/login
```

**3. Obter Detalhes de um Usuário (`GET /api/users/:id`)**
(Substitua `1` pelo ID do usuário que você registrou)

```bash
curl -X GET http://localhost:3000/api/users/1
```

**4. Atualizar Perfil do Usuário (`PATCH /api/users/:id`)**
(Substitua `1` pelo ID do usuário)

```bash
curl -X PATCH -H "Content-Type: application/json" -d '{
    "fullName": "Usuário de Teste",
    "profilePictureUrl": "http://example.com/profile.jpg"
}' http://localhost:3000/api/users/1
```

**5. Criar um Novo GT (`POST /api/gts`)**

```bash
curl -X POST -H "Content-Type: application/json" -d '{
    "title": "GT de Gestão",
    "description": "Discussão sobre gestão estratégica.",
    "zoom_link": "http://zoom.us/gt-gestao",
    "presenter_name": "Mestre A",
    "gt_date": "2025-07-10",
    "gt_time": "10:00:00",
    "category": "Gestão e Estratégia"
}' http://localhost:3000/api/gts
```

**6. Obter Todos os GTs (`GET /api/gts`)**

```bash
curl -X GET http://localhost:3000/api/gts
```

**7. Criar um Novo Encontro (`POST /api/encontros`)**

```bash
curl -X POST -H "Content-Type: application/json" -d '{
    "title": "Encontro Trimestral Q3",
    "description": "Nosso encontro de final de trimestre.",
    "event_date": "2025-09-20",
    "location": "Centro de Convenções",
    "additional_info": "Palestrantes convidados."
}' http://localhost:3000/api/encontros
```

**8. Criar um Restaurante para um Encontro (`POST /api/restaurantes`)**
(Substitua `1` pelo ID do encontro criado)

```bash
curl -X POST -H "Content-Type: application/json" -d '{
    "encontro_id": 1,
    "name": "Restaurante Sabor",
    "cuisine_type": "Brasileira",
    "address": "Rua Exemplo, 123",
    "map_link": "http://maps.google.com/sabor"
}' http://localhost:3000/api/restaurantes
```

**9. Criar um Novo Post (`POST /api/posts`)**
(Substitua `1` pelo ID do usuário)

```bash
curl -X POST -H "Content-Type: application/json" -d '{
    "user_id": 1,
    "content": "Meu primeiro post na Sala do Mestres!",
    "image_url": "http://example.com/my_post_image.jpg"
}' http://localhost:3000/api/posts
```

**10. Criar um Novo Comentário em um Post (`POST /api/comments`)**
(Substitua `1` pelo ID do post e `1` pelo ID do usuário)

```bash
curl -X POST -H "Content-Type: application/json" -d '{
    "post_id": 1,
    "user_id": 1,
    "comment_text": "Ótimo post!"
}' http://localhost:3000/api/comments
```
