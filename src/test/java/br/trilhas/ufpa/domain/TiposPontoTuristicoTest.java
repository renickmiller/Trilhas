package br.trilhas.ufpa.domain;

import static org.assertj.core.api.Assertions.assertThat;

import br.trilhas.ufpa.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TiposPontoTuristicoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TiposPontoTuristico.class);
        TiposPontoTuristico tiposPontoTuristico1 = new TiposPontoTuristico();
        tiposPontoTuristico1.setId(1L);
        TiposPontoTuristico tiposPontoTuristico2 = new TiposPontoTuristico();
        tiposPontoTuristico2.setId(tiposPontoTuristico1.getId());
        assertThat(tiposPontoTuristico1).isEqualTo(tiposPontoTuristico2);
        tiposPontoTuristico2.setId(2L);
        assertThat(tiposPontoTuristico1).isNotEqualTo(tiposPontoTuristico2);
        tiposPontoTuristico1.setId(null);
        assertThat(tiposPontoTuristico1).isNotEqualTo(tiposPontoTuristico2);
    }
}
