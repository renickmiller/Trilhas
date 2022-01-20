package br.trilhas.ufpa.domain;

import static org.assertj.core.api.Assertions.assertThat;

import br.trilhas.ufpa.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TiposPontoVendaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TiposPontoVenda.class);
        TiposPontoVenda tiposPontoVenda1 = new TiposPontoVenda();
        tiposPontoVenda1.setId(1L);
        TiposPontoVenda tiposPontoVenda2 = new TiposPontoVenda();
        tiposPontoVenda2.setId(tiposPontoVenda1.getId());
        assertThat(tiposPontoVenda1).isEqualTo(tiposPontoVenda2);
        tiposPontoVenda2.setId(2L);
        assertThat(tiposPontoVenda1).isNotEqualTo(tiposPontoVenda2);
        tiposPontoVenda1.setId(null);
        assertThat(tiposPontoVenda1).isNotEqualTo(tiposPontoVenda2);
    }
}
