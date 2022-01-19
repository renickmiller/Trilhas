import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'trilhas',
        data: { pageTitle: 'trilhasTesteApp.trilhas.home.title' },
        loadChildren: () => import('./trilhas/trilhas.module').then(m => m.TrilhasModule),
      },
      {
        path: 'cadastro-trilha',
        data: { pageTitle: 'trilhasTesteApp.cadastroTrilha.home.title' },
        loadChildren: () => import('./cadastro-trilha/cadastro-trilha.module').then(m => m.CadastroTrilhaModule),
      },
      {
        path: 'usuario',
        data: { pageTitle: 'trilhasTesteApp.usuario.home.title' },
        loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule),
      },
      {
        path: 'situacoes-trilha',
        data: { pageTitle: 'trilhasTesteApp.situacoesTrilha.home.title' },
        loadChildren: () => import('./situacoes-trilha/situacoes-trilha.module').then(m => m.SituacoesTrilhaModule),
      },
      {
        path: 'pontos-venda',
        data: { pageTitle: 'trilhasTesteApp.pontosVenda.home.title' },
        loadChildren: () => import('./pontos-venda/pontos-venda.module').then(m => m.PontosVendaModule),
      },
      {
        path: 'pontos-cardeais',
        data: { pageTitle: 'trilhasTesteApp.pontosCardeais.home.title' },
        loadChildren: () => import('./pontos-cardeais/pontos-cardeais.module').then(m => m.PontosCardeaisModule),
      },
      {
        path: 'pontos-turisticos',
        data: { pageTitle: 'trilhasTesteApp.pontosTuristicos.home.title' },
        loadChildren: () => import('./pontos-turisticos/pontos-turisticos.module').then(m => m.PontosTuristicosModule),
      },
      {
        path: 'tipos-ponto-venda',
        data: { pageTitle: 'trilhasTesteApp.tiposPontoVenda.home.title' },
        loadChildren: () => import('./tipos-ponto-venda/tipos-ponto-venda.module').then(m => m.TiposPontoVendaModule),
      },
      {
        path: 'municipios',
        data: { pageTitle: 'trilhasTesteApp.municipios.home.title' },
        loadChildren: () => import('./municipios/municipios.module').then(m => m.MunicipiosModule),
      },
      {
        path: 'tipos-ponto-turistico',
        data: { pageTitle: 'trilhasTesteApp.tiposPontoTuristico.home.title' },
        loadChildren: () => import('./tipos-ponto-turistico/tipos-ponto-turistico.module').then(m => m.TiposPontoTuristicoModule),
      },
      {
        path: 'fotografias',
        data: { pageTitle: 'trilhasTesteApp.fotografias.home.title' },
        loadChildren: () => import('./fotografias/fotografias.module').then(m => m.FotografiasModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
