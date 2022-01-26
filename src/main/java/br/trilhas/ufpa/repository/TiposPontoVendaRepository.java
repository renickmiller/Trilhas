package br.trilhas.ufpa.repository;

import br.trilhas.ufpa.domain.TiposPontoVenda;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the TiposPontoVenda entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TiposPontoVendaRepository extends JpaRepository<TiposPontoVenda, Long> {}
