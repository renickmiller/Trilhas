package br.trilhas.ufpa.repository;

import br.trilhas.ufpa.domain.PontosCardeais;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the PontosCardeais entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PontosCardeaisRepository extends JpaRepository<PontosCardeais, Long> {}
