import { Router } from "express";
import { sanitizeInput } from "../middlewares";

import { UserController } from "./controllers/UserController";
import { CadastroCervejaController } from "./controllers/CadastroCervejaController";
import { CadastroAtividadeController } from "./controllers/CadastroAtividadeController";
import { CadastroAtividadeCustomController } from "./controllers/CadastroAtividadeCustomController";
import { CadastroAtividadeCervejaController } from "./controllers/CadastroAtividadeCervejaController";
import { CalendarioController } from "./controllers/CalendarioController";
import { OpController } from "./controllers/OpController";
import { OpEditController } from "./controllers/OpEditController";
import { CervejaController } from "./controllers/CervejaController";
import { InoculacaoController } from "./controllers/InoculacaoController";
import { MonitoramentoController } from "./controllers/MonitoramentoController";
import { FermentacaoForcadaController } from "./controllers/FermentacaoForcadaController";
import { MedicaoPhController } from "./controllers/MedicaoPhController";
import { LeveduraController } from "./controllers/LeveduraController";
import { DryHoppingController } from "./controllers/DryHoppingController";
import { CarbonatacaoController } from "./controllers/CarbonatacaoController";
import { TransferenciaController } from "./controllers/TransferenciaController";
import { EnvaseLataController } from "./controllers/EnvaseLataController";
import { EnvaseBarrilController } from "./controllers/EnvaseBarrilController";
import { PrimingController } from "./controllers/PrimingController";
import { CentrifugacaoController } from "./controllers/CentrifugacaoController";
import { CentrifugacaoResumoController } from "./controllers/CentrifugacaoResumoController";
import { BrassagemController } from "./controllers/BrassagemController";
import { PreparacaoMalteController } from "./controllers/PreparacaoMalteController";
import { PasteurizacaoController } from "./controllers/PasteurizacaoController";
import { DashboardController } from "./controllers/DashboardController";
import { TanqueController } from "./controllers/TanqueController";

const apiRouter = Router();
////////// USERS ////////////
apiRouter.route("/user/info")
	.get(UserController.getUserInfo);

////////// CADASTRO DE CERVEJAS ////////////
apiRouter.route("/cadastro/cerveja")
	.get(CadastroCervejaController.getCerveja)
	.post([sanitizeInput], CadastroCervejaController.addCerveja)
	.delete([sanitizeInput], CadastroCervejaController.deleteCerveja);

////////// CADASTRO DE ATIVIDADES DEFAULT ////////////
apiRouter.route("/cadastro/atividade")
	.get(CadastroAtividadeController.getAtividade)
	.post([sanitizeInput], CadastroAtividadeController.addAtividade)
	.delete([sanitizeInput], CadastroAtividadeController.deleteAtividade);

////////// CADASTRO DE ATIVIDADES CUSTOM ////////////
apiRouter.route("/cadastro/atividade/custom")
	.get(CadastroAtividadeCustomController.getAtividade)
	.post([sanitizeInput], CadastroAtividadeCustomController.addAtividade)
	.delete([sanitizeInput], CadastroAtividadeCustomController.deleteAtividade);

////////// CADASTRO DE ATIVIDADES CERVEJA ////////////
apiRouter.route("/cadastro/atividade/cerveja")
	.get(CadastroAtividadeCervejaController.getAtividade)
	.post([sanitizeInput], CadastroAtividadeCervejaController.addAtividade)
	.delete([sanitizeInput], CadastroAtividadeCervejaController.deleteAtividade);

//////////////////// EXIBIÇÃO TANQUES /////////////////////
apiRouter.route("/calendario")
	.get(CalendarioController.getCalendario);

//////////////////// ORDENS DE PRODUÇÃO /////////////////////
apiRouter.route("/odp")
	.get(OpController.getOp)
	.post([sanitizeInput], OpController.addOp)
	.put([sanitizeInput], OpController.updateStatus);

//////////////////// ORDENS DE PRODUÇÂO - EDIÇÃO /////////////////////
apiRouter.route("/odp/edit")
	.post([sanitizeInput], OpEditController.editOp);

////////// MODULO CERVEJA ////////////
apiRouter.route("/cerveja")
	.get(CervejaController.getCerveja)
	.post([sanitizeInput], CervejaController.updateCerveja);

////////// MODULO INOCULACAO DE LEVEDURA ////////////
apiRouter.route("/inoculacao")
	.get(InoculacaoController.getInoculacao)
	.post([sanitizeInput], InoculacaoController.addInoculacao)
	.delete([sanitizeInput], InoculacaoController.deleteInoculacao);

////////// MODULO MONITORAMENTO ////////////
apiRouter.route("/monitoramento")
	.get(MonitoramentoController.getMonitoramento)
	.post([sanitizeInput], MonitoramentoController.addMonitoramento)
	.delete([sanitizeInput], MonitoramentoController.deleteMonitoramento);

////////// MODULO FERMENTACAO FORÇADA ////////////
apiRouter.route("/fermentacao")
	.get(FermentacaoForcadaController.getFermentacaoForcada)
	.post([sanitizeInput], FermentacaoForcadaController.addFermentacaoForcada)
	.delete([sanitizeInput], FermentacaoForcadaController.deleteFermentacaoForcada);

////////// MODULO MEDICAO PH ////////////
apiRouter.route("/ph")
	.get(MedicaoPhController.getMedicaoPh)
	.post([sanitizeInput], MedicaoPhController.addMedicaoPh)
	.delete([sanitizeInput], MedicaoPhController.deleteMedicaoPh);

////////// COLETA DE LEVEDURA ////////////
apiRouter.route("/levedura")
	.get(LeveduraController.getLevedura)
	.post([sanitizeInput], LeveduraController.addLevedura)
	.delete([sanitizeInput], LeveduraController.deleteLevedura);

////////// DRY HOPPING ////////////
apiRouter.route("/dryhopping")
	.get(DryHoppingController.getDryHopping)
	.post([sanitizeInput], DryHoppingController.addDryHopping)
	.delete([sanitizeInput], DryHoppingController.deleteDryHopping);

////////// CARBONATACAO ////////////
apiRouter.route("/carbonatacao")
	.get(CarbonatacaoController.getCarbonatacao)
	.post([sanitizeInput], CarbonatacaoController.addCarbonatacao)
	.delete([sanitizeInput], CarbonatacaoController.deleteCarbonatacao);

////////// TRANSFERENCIA ////////////
apiRouter.route("/transferencia")
	.get(TransferenciaController.getTransferencia)
	.post([sanitizeInput], TransferenciaController.addTransferencia)
	.delete([sanitizeInput], TransferenciaController.deleteTransferencia);

////////// ENVASE LATAS ////////////
apiRouter.route("/envase/lata")
	.get(EnvaseLataController.getEnvaseLata)
	.post([sanitizeInput], EnvaseLataController.addEnvaseLata)
	.delete([sanitizeInput], EnvaseLataController.deleteEnvaseLata);

////////// ENVASE BARRIS ////////////
apiRouter.route("/envase/barris")
	.get(EnvaseBarrilController.getEnvaseBarril)
	.post([sanitizeInput], EnvaseBarrilController.addEnvaseBarril)
	.delete([sanitizeInput], EnvaseBarrilController.deleteEnvaseBarril);

////////// PRIMING ////////////
apiRouter.route("/priming")
	.get(PrimingController.getPriming)
	.post([sanitizeInput], PrimingController.addPriming)
	.delete([sanitizeInput], PrimingController.deletePriming);

////////// CENTRIFUGAÇÃO ////////////
apiRouter.route("/centrifugacao")
	.get(CentrifugacaoController.getCentrifugacao)
	.post([sanitizeInput], CentrifugacaoController.addCentrifugacao)
	.delete([sanitizeInput], CentrifugacaoController.deleteCentrifugacao);

////////// CENTRIFUGAÇÃO - RESUMO ////////////
apiRouter.route("/resumo-centrifugacao")
	.get(CentrifugacaoResumoController.getCentrifugacaoResumo)
	.post([sanitizeInput], CentrifugacaoResumoController.addCentrifugacaoResumo)
	.delete([sanitizeInput], CentrifugacaoResumoController.deleteCentrifugacaoResumo);

////////// BRASSAGEM ////////////
apiRouter.route("/brassagem")
	.get(BrassagemController.getBrassagem)
	.post([sanitizeInput], BrassagemController.addBrassagem)
	.delete([sanitizeInput], BrassagemController.deleteBrassagem);

////////// PREPARACAO DE MALTES ////////////
apiRouter.route("/preparacao/malte")
	.get(PreparacaoMalteController.getPreparacaoMalte)
	.post([sanitizeInput], PreparacaoMalteController.addPreparacaoMalte)
	.delete([sanitizeInput], PreparacaoMalteController.deletePreparacaoMalte);

////////// PASTEURIZAÇÃO ////////////
apiRouter.route("/pasteurizacao")
	.get(PasteurizacaoController.getPasteurizacao)
	.post([sanitizeInput], PasteurizacaoController.addPasteurizacao)
	.delete([sanitizeInput], PasteurizacaoController.deletePasteurizacao);

////////// DASHBOARDS ////////////
apiRouter.route("/dashboard/donut/op")
	.get(DashboardController.getDonutOp);

apiRouter.route("/dashboard/bar/op")
	.get(DashboardController.getBarOp);

apiRouter.route("/dashboard/donut/latas")
	.get(DashboardController.getDonutLatas);

apiRouter.route("/dashboard/donut/latas/detalhado")
	.get(DashboardController.getDonutLatasDetalhado);

//////////////////// EXIBIÇÃO TANQUES /////////////////////
apiRouter.route("/tanque")
	.get(TanqueController.getTanque);
//////////////////// HISTÓRICO TANQUES /////////////////////
apiRouter.route("/tanque/historico")
	.get(TanqueController.getTanqueHistorico);

////////// CADASTRO DE TANQUES ////////////
apiRouter.route("/tanque/register")
	.get(TanqueController.getTanqueRegister)
	.post([sanitizeInput], TanqueController.addTanqueRegister)
	.delete([sanitizeInput], TanqueController.deleteTanqueRegister);

export default apiRouter;