package br.trilhas.ufpa.repository;

import br.trilhas.ufpa.domain.CadastroTrilha;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the CadastroTrilha entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CadastroTrilhaRepository extends JpaRepository<CadastroTrilha, Long> {}
