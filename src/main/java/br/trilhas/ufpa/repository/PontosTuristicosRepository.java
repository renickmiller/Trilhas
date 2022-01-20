package br.trilhas.ufpa.repository;

import br.trilhas.ufpa.domain.PontosTuristicos;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the PontosTuristicos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PontosTuristicosRepository extends JpaRepository<PontosTuristicos, Long> {}
