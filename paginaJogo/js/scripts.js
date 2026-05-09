function mudarTema(){
    const btnTema = document.getElementById("btnTema");
    if(btnTema.className.match("temaEscuro")){
        btnTema.innerHTML = '<i class="bi bi-brightness-low-fill"></i>';
        btnTema.className = "temaClaro";
        document.body.style.setProperty("--corNav", "#eeeeeeff");
        document.body.style.setProperty("--corFundo", "#F9F9FF");
        document.body.style.setProperty("--corTexto", "black");
    } else{
        btnTema.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';
        btnTema.className = "temaEscuro";
        document.body.style.setProperty("--corNav", "black");
        document.body.style.setProperty("--corFundo", "#0A0A0F");
        document.body.style.setProperty("--corTexto", "white");
    }
}

function alunoConvidado(){
    console.log("Executou")
    var selecionado = document.getElementById("conv/aluno").value;
    var turma = document.getElementById("turmaDiv");
    var telefone = document.getElementById("telefoneDiv");

    console.log("Seleção: "+selecionado);

    if(selecionado == "Convidado"){
        telefone.style.display = "flex";
        turma.style.display = "none";
    } else{
        turma.style.display = "flex";
        telefone.style.display = "none";
        document.getElementById("telefone").removeAttribute("required");
    }
}

function validar() {
    document.querySelector(".caixa-resultado").style.display = "flex";

    document.getElementById("btnFecha").addEventListener("click", () => {
        document.querySelector(".caixa-resultado").style.display = "none";
        document.querySelector(".caixa-form-cad").submit();
    });

    return false;
}