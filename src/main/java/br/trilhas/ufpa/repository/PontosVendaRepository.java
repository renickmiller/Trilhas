package br.trilhas.ufpa.repository;

import br.trilhas.ufpa.domain.PontosVenda;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the PontosVenda entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PontosVendaRepository extends JpaRepository<PontosVenda, Long> {}
