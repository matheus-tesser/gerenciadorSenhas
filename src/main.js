import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://zwnnvtuhpzzfsnfncsxx.supabase.co'
const supabaseKey = 'sb_publishable_0KP_l-LRMNa5P31Fz23JMA_YJ00HvhY'
const supabase= createClient(supabaseUrl, supabaseKey)

const idForm = document.getElementById('form-senha')

idForm.addEventListener('submit', async (evento) => {
  evento.preventDefault()

  const servico = document.getElementById('servico')
  const usuario = document.getElementById('usuario')
  const senha = document.getElementById('senha')

  let servicoSalvo = servico.value
  let senhaSalvo = senha.value
  let usuarioSalvo = usuario.value

  const {error} = await supabase
  .from('senhas')
  .insert([
    {
      servico: servicoSalvo,
      usuario: usuarioSalvo,
      senha: senhaSalvo
    }
  ])

  if (error) {
    console.error('Erro detalhado', error)
    alert('Deu erro ao salvar')
  } else {
    alert('Senha salva com sucesso')
    idForm.reset()
    buscarSenhas()
  }

})


async function buscarSenhas() {
  const { data, error } = await supabase
  .from('senhas')
  .select('*')

  if (error) {
    console.error("Erro ao buscar dados:", error)
    return
  }

  const containerLista = document.getElementById('lista-senhas')
  containerLista.innerHTML = ''

  data.forEach(item => {
    containerLista.innerHTML += `
      <div class="cartao-senha">
        <p><strong>Serviço:</strong> ${item.servico}</p>
        <p><strong>Usuário:</strong> ${item.usuario}</p>
        <p><strong>Senha:</strong> ${item.senha}</p>
      </div>
    `
  })
}


