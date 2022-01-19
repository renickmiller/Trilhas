package br.trilhas.ufpa.repository;

import br.trilhas.ufpa.domain.TiposPontoTuristico;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the TiposPontoTuristico entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TiposPontoTuristicoRepository extends JpaRepository<TiposPontoTuristico, Long> {}
