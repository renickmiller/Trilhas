package br.trilhas.ufpa.repository;

import br.trilhas.ufpa.domain.Municipios;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Municipios entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MunicipiosRepository extends JpaRepository<Municipios, Long> {}
