import React, { Component } from "react";

import AdicionarUsuario from "../AdicionarUsuario/AdicionarUsuario";
import Usuario from "../Usuario/Usuario";

class Usuarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarios: [],
    };

    this.adicionarUsuario = this.adicionarUsuario.bind(this);
  }

  adicionarUsuario(usuario) {
    const usuarios = [...this.state.usuarios, usuario];
    this.setState({ usuarios: usuarios });
  }

  removerUsuario(usuario) {
    if (
      window.confirm(
        `Tem certeza que deseja remover "${usuario.nome} ${usuario.sobrenome}"?`
      )
    ) {
      fetch(`https://reqres.in/api/users/${usuario.id}`, {
        method: "DELETE",
      }).then((response) => {
        console.log(response);
        let usuarios = this.state.usuarios;
        usuarios = usuarios.filter((x) => x.id !== usuario.id);
        this.setState({ usuarios: usuarios });
      });
    }
  }

  async componentDidMount() {
    const response = await fetch("https://reqres.in/api/users");
    const json = await response.json();
    const data = await json.data;

    const newData = data.map((element) => {
      return {
        id: element.id,
        nome: element.first_name,
        sobrenome: element.last_name,
        email: element.email,
      };
    });

    this.setState({ usuarios: newData });
  }

  render() {
    return (
      <>
        <AdicionarUsuario adicionarUsuario={this.adicionarUsuario} />

        {this.state.usuarios.map((usuario) => (
          <Usuario
            key={usuario.id}
            usuario={usuario}
            removerUsuario={this.removerUsuario.bind(this, usuario)}
          />
        ))}
      </>
    );
  }
}

export default Usuarios;
