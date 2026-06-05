// ─────────────────────────────────────────────────────────────
//  AeroCode — Simulação de Carga e Métricas
//  Rode com: node simular_carga.js
//  Requisito: servidor rodando em http://localhost:3333
//
//  Métricas coletadas:
//  - Latência
//  - Tempo de Processamento
//  - Tempo de Resposta
//
//  O backend deve retornar o header:
//  X-Processing-Time
// ─────────────────────────────────────────────────────────────

const BASE_URL = "http://localhost:3333";
const REPETICOES = 10;

// ── Login ────────────────────────────────────────────────────
async function obterToken() {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      usuario: "admin",
      senha: "admin123",
    }),
  });

  if (!res.ok) {
    console.error(
      "❌ Falha no login. Verifique o servidor e as credenciais."
    );
    process.exit(1);
  }

  const data = await res.json();

  console.log("✅ Login realizado com sucesso.\n");

  return data.token;
}

// ── Mede uma requisição ──────────────────────────────────────
async function medirRequisicao(url, token) {
  const inicio = performance.now();

  const resposta = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const tempoResposta = performance.now() - inicio;

  const tempoProcessamento = Number(
    resposta.headers.get("X-Processing-Time") || 0
  );

  const latencia = Math.max(
    0,
    tempoResposta - tempoProcessamento
  );

  return {
    tempoResposta,
    tempoProcessamento,
    latencia,
  };
}

// ── Média aparada (trimmed mean) ─────────────────────────────
function mediaAparada(valores) {
  const ordenados = [...valores].sort((a, b) => a - b);

  const corte = Math.floor(ordenados.length * 0.1);

  const aparados =
    ordenados.length > 2
      ? ordenados.slice(corte, ordenados.length - corte)
      : ordenados;

  return (
    aparados.reduce((soma, v) => soma + v, 0) /
    aparados.length
  );
}

// ── Simula N usuários simultâneos ────────────────────────────
async function simularUsuarios(n, token, endpoint) {
  const respostas = [];
  const processamentos = [];
  const latencias = [];

  for (let rodada = 0; rodada < REPETICOES; rodada++) {
    const requisicoes = Array.from(
      { length: n },
      () =>
        medirRequisicao(
          `${BASE_URL}${endpoint}`,
          token
        )
    );

    const resultados = await Promise.all(requisicoes);

    respostas.push(
      resultados.reduce(
        (soma, item) => soma + item.tempoResposta,
        0
      ) / resultados.length
    );

    processamentos.push(
      resultados.reduce(
        (soma, item) =>
          soma + item.tempoProcessamento,
        0
      ) / resultados.length
    );

    latencias.push(
      resultados.reduce(
        (soma, item) => soma + item.latencia,
        0
      ) / resultados.length
    );
  }

  return {
    resposta: mediaAparada(respostas),
    processamento: mediaAparada(processamentos),
    latencia: mediaAparada(latencias),
  };
}

// ── Programa principal ──────────────────────────────────────
async function main() {
  console.log("═══════════════════════════════════════════");
  console.log("   AeroCode — Simulação de Carga");
  console.log("═══════════════════════════════════════════\n");

  const token = await obterToken();

  const cenarios = [1, 5, 10];

  const endpoints = [
    "/funcionarios",
    "/aeronaves",
    "/pecas",
    "/etapas",
  ];

  const resultados = {};

  for (const endpoint of endpoints) {
    console.log(`📡 Endpoint: ${endpoint}`);

    resultados[endpoint] = {};

    for (const usuarios of cenarios) {
      process.stdout.write(
        `   ${usuarios} usuário(s) simultâneo(s)... `
      );

      const dados = await simularUsuarios(
        usuarios,
        token,
        endpoint
      );

      resultados[endpoint][usuarios] = {
        latencia: Number(
          dados.latencia.toFixed(2)
        ),
        processamento: Number(
          dados.processamento.toFixed(2)
        ),
        resposta: Number(
          dados.resposta.toFixed(2)
        ),
      };

      console.log(
        `LAT ${dados.latencia.toFixed(2)}ms | ` +
          `PROC ${dados.processamento.toFixed(2)}ms | ` +
          `RESP ${dados.resposta.toFixed(2)}ms`
      );
    }

    console.log();
  }

  console.log(
    "\n═══════════════════════════════════════════"
  );
  console.log(
    "      RESULTADO FINAL PARA O RELATÓRIO"
  );
  console.log(
    "═══════════════════════════════════════════\n"
  );

  console.log(
    JSON.stringify(resultados, null, 2)
  );
}

main().catch((erro) => {
  console.error(
    "\n❌ Erro inesperado:",
    erro.message
  );
  process.exit(1);
});