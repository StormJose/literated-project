<%@page language="java" import="java.sql.*" %>

<%

  // cria as variáveis
  String vnome = request.getParameter("txtNome") ;
  String vemail = request.getParameter("txtEmail");
  String vtel = request.getParameter("txtTelefone");
  String vlocal = request.getParameter("txtLocal");
  String vplano = request.getParameter("txtPlano");
  String vdescoberta = request.getParameter("txtDescover");
  String vdata = request.getParameter("txtData");

  // variáveis para o banco de dados
  String banco = "orders";
  String endereco = "jdbc:mysql://localhost:3306/" + banco;
  String usuario = "root";
  String senha = "";

  String driver = "com.mysql.jdbc.Driver";

  // Carregar o driver na memória
  Class.forName( driver );

  // cria a variável para conectar com o banco
  Connection conexao ;
  //Abrir a conexao com o banco de dados
  conexao = DriverManager.getConnection(endereco, usuario, senha);

  //Cria a variável sql com o comando Insert
  String sql = "INSERT INTO pedidos (nome, email, telefone, pais, plano, descoberta, dia) values(?, ?, ?, ?, ?, ?, ?)" ;

  PreparedStatement stm = conexao.prepareStatement(sql);
  stm.setString(1, vnome);
  stm.setString(2, vemail);
  stm.setString(3, vtel);
  stm.setString(4, vlocal);
  stm.setString(5, vplano);
  stm.setString(6, vdescoberta);
  stm.setString(7, vdata);
  
  stm.execute() ;
  stm.close();

  out.print("Seu pedido foi feito com sucesso");

%>
 