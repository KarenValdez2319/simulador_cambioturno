datos = {
  turno: ["matutino", "vespertino", "nocturno", "mixto"],
  personal: [
    {
      idPersonal: 1,
      usuario: "vmartinez",
      nombreCompleto: "Victor Martinez",
      puesto: "GE IDP",
    },
    {
      idPersonal: 2,
      usuario: "rrivera",
      nombreCompleto: "Ramon Rivera",
      puesto: "CO IDP",
    },
    {
      idPersonal: 3,
      usuario: "aproom",
      nombreCompleto: "Angel Martinez",
      puesto: "LI IDP",
    },
    {
      idPersonal: 4,
      usuario: "aarredondov",
      nombreCompleto: "Ana Arredondo",
      puesto: "LI CALIDAD",
    },
    {
      idPersonal: 5,
      usuario: "glomas",
      nombreCompleto: "Gustavo Lomas",
      puesto: "Operador SAC",
    },
    {
      idPersonal: 6,
      usuario: "jlsanchez",
      nombreCompleto: "Jose Luis Sanchez",
      puesto: "LI SAC",
    },
  ],
};

class Turno {
  constructor(calidad, sac, operador, turno) {
    this.calidad = calidad;
    this.sac = sac;
    this.operador = operador;
    this.turno = turno;
  }

  InformacionCalidad() {
    console.log(`LI CALIDAD: ${this.calidad}`);
    return this.calidad;
  }

  informacionSAC() {
    console.log(`LI SAC: ${this.sac}`);
    return this.sac;
  }

  informacionOperador() {
    console.log(`Operador de Escaner: ${this.operador}`);
    return this.operador;
  }

  reporteTurno() {
    return alert(
      `Reporte Turno\n LI CALIDAD: ${this.calidad}\n LI SAC: ${this.sac}\n Operador Escaner: ${this.operador} \n Turno: ${this.turno} `
    );
  }
}

async function obtenerUsuario(usuario, puesto) {
  try {
    if (datos.personal) {
      let buscarUsuario = datos.personal.find(
        (personal) => personal.usuario == usuario && personal.puesto == puesto
      );

      return buscarUsuario;
    }
  } catch (error) {
    console.log("Error:", error);
  }
  return null;
}

async function obtenerTurno(turnoElegido) {
  try {
    if (datos.turno) {
      let buscarTurno = datos.turno.find((turno) => turno == turnoElegido);

      return buscarTurno;
    }

    return null;
  } catch (error) {
    console.log("Error:", error);
  }
}

async function cambioTurno() {
  let usuarioValidado = false;
  let turnoValidado = false;
  let usuario;
  let usuarioCalidad;
  let usuarioSAC;
  let usuarioOperador;
  let turnoElegido;

  while (!usuarioValidado) {
    usuario = prompt("Ingresa Líder de SAC");

    if (!usuario.toLowerCase()) {
      alert("No se ingresó un usuario. Inténtalo de Nuevo");
      continue;
    }

    let usuarioEncontrado = await obtenerUsuario(
      usuario.toLowerCase(),
      "LI SAC"
    );

    if (usuarioEncontrado) {
      usuarioValidado = true;
      usuarioSAC = usuarioEncontrado;
    } else {
      alert(
        "El usuario ingresado no pertenece al puesto de LI de SAC. Inténtalo de Nuevo."
      );
    }
  }

  usuarioValidado = false;
  while (!usuarioValidado) {
    usuario = prompt("Ingresa Líder de Calidad");

    if (!usuario) {
      alert("No se ingresó un usuario. Inténtalo de Nuevo");
      continue;
    }

    let usuarioEncontrado = await obtenerUsuario(
      usuario.toLowerCase(),
      "LI CALIDAD"
    );

    if (usuarioEncontrado) {
      usuarioValidado = true;
      usuarioCalidad = usuarioEncontrado;
    } else {
      alert(
        "El usuario ingresado no pertenece al puesto de LI de SAC. Inténtalo de Nuevo."
      );
    }
  }

  usuarioValidado = false;
  while (!usuarioValidado) {
    usuario = prompt("Ingresa Operador");

    if (!usuario) {
      alert("No se ingresó un usuario. Inténtalo de Nuevo");
      continue;
    }

    let usuarioEncontrado = await obtenerUsuario(
      usuario.toLowerCase(),
      "Operador SAC"
    );

    if (usuarioEncontrado) {
      usuarioValidado = true;
      usuarioOperador = usuarioEncontrado;
    } else {
      alert(
        "El usuario ingresado no pertenece al puesto de LI de SAC. Inténtalo de Nuevo."
      );
    }
  }

  turnoValidado = false;
  while (!turnoValidado) {
    turnoElegido = prompt(
      "Ingresa Turno\n - Matutino \n - Vespertino \n - Nocturno \n - Mixto"
    );

    if (!turnoElegido) {
      alert("No se ingreso un turno valido. Inténtalo de Nuevo");
      continue;
    }

    let turnoEncontrado = await obtenerTurno(turnoElegido);

    if (turnoEncontrado) {
      turnoValidado = true;
      turnoElegido = turnoEncontrado;
    } else {
      alert("El turno ingresado no pertence al listado de Turnos.");
    }
  }

  const informacion = new Turno(
    usuarioCalidad.usuario,
    usuarioSAC.usuario,
    usuarioOperador.usuario,
    turnoElegido
  );

  informacion.reporteTurno();
}

cambioTurno();
