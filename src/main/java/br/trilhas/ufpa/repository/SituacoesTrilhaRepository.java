package br.trilhas.ufpa.repository;

import br.trilhas.ufpa.domain.SituacoesTrilha;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the SituacoesTrilha entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SituacoesTrilhaRepository extends JpaRepository<SituacoesTrilha, Long> {}
