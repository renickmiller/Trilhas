package br.trilhas.ufpa.web.rest;

import br.trilhas.ufpa.domain.TiposPontoTuristico;
import br.trilhas.ufpa.repository.TiposPontoTuristicoRepository;
import br.trilhas.ufpa.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link br.trilhas.ufpa.domain.TiposPontoTuristico}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TiposPontoTuristicoResource {

    private final Logger log = LoggerFactory.getLogger(TiposPontoTuristicoResource.class);

    private static final String ENTITY_NAME = "tiposPontoTuristico";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TiposPontoTuristicoRepository tiposPontoTuristicoRepository;

    public TiposPontoTuristicoResource(TiposPontoTuristicoRepository tiposPontoTuristicoRepository) {
        this.tiposPontoTuristicoRepository = tiposPontoTuristicoRepository;
    }

    /**
     * {@code POST  /tipos-ponto-turisticos} : Create a new tiposPontoTuristico.
     *
     * @param tiposPontoTuristico the tiposPontoTuristico to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tiposPontoTuristico, or with status {@code 400 (Bad Request)} if the tiposPontoTuristico has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipos-ponto-turisticos")
    public ResponseEntity<TiposPontoTuristico> createTiposPontoTuristico(@RequestBody TiposPontoTuristico tiposPontoTuristico)
        throws URISyntaxException {
        log.debug("REST request to save TiposPontoTuristico : {}", tiposPontoTuristico);
        if (tiposPontoTuristico.getId() != null) {
            throw new BadRequestAlertException("A new tiposPontoTuristico cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TiposPontoTuristico result = tiposPontoTuristicoRepository.save(tiposPontoTuristico);
        return ResponseEntity
            .created(new URI("/api/tipos-ponto-turisticos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipos-ponto-turisticos/:id} : Updates an existing tiposPontoTuristico.
     *
     * @param id the id of the tiposPontoTuristico to save.
     * @param tiposPontoTuristico the tiposPontoTuristico to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tiposPontoTuristico,
     * or with status {@code 400 (Bad Request)} if the tiposPontoTuristico is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tiposPontoTuristico couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipos-ponto-turisticos/{id}")
    public ResponseEntity<TiposPontoTuristico> updateTiposPontoTuristico(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TiposPontoTuristico tiposPontoTuristico
    ) throws URISyntaxException {
        log.debug("REST request to update TiposPontoTuristico : {}, {}", id, tiposPontoTuristico);
        if (tiposPontoTuristico.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tiposPontoTuristico.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tiposPontoTuristicoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TiposPontoTuristico result = tiposPontoTuristicoRepository.save(tiposPontoTuristico);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tiposPontoTuristico.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /tipos-ponto-turisticos/:id} : Partial updates given fields of an existing tiposPontoTuristico, field will ignore if it is null
     *
     * @param id the id of the tiposPontoTuristico to save.
     * @param tiposPontoTuristico the tiposPontoTuristico to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tiposPontoTuristico,
     * or with status {@code 400 (Bad Request)} if the tiposPontoTuristico is not valid,
     * or with status {@code 404 (Not Found)} if the tiposPontoTuristico is not found,
     * or with status {@code 500 (Internal Server Error)} if the tiposPontoTuristico couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/tipos-ponto-turisticos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TiposPontoTuristico> partialUpdateTiposPontoTuristico(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TiposPontoTuristico tiposPontoTuristico
    ) throws URISyntaxException {
        log.debug("REST request to partial update TiposPontoTuristico partially : {}, {}", id, tiposPontoTuristico);
        if (tiposPontoTuristico.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tiposPontoTuristico.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tiposPontoTuristicoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TiposPontoTuristico> result = tiposPontoTuristicoRepository
            .findById(tiposPontoTuristico.getId())
            .map(existingTiposPontoTuristico -> {
                if (tiposPontoTuristico.getNome() != null) {
                    existingTiposPontoTuristico.setNome(tiposPontoTuristico.getNome());
                }
                if (tiposPontoTuristico.getDescricao() != null) {
                    existingTiposPontoTuristico.setDescricao(tiposPontoTuristico.getDescricao());
                }

                return existingTiposPontoTuristico;
            })
            .map(tiposPontoTuristicoRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tiposPontoTuristico.getId().toString())
        );
    }

    /**
     * {@code GET  /tipos-ponto-turisticos} : get all the tiposPontoTuristicos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tiposPontoTuristicos in body.
     */
    @GetMapping("/tipos-ponto-turisticos")
    public List<TiposPontoTuristico> getAllTiposPontoTuristicos() {
        log.debug("REST request to get all TiposPontoTuristicos");
        return tiposPontoTuristicoRepository.findAll();
    }

    /**
     * {@code GET  /tipos-ponto-turisticos/:id} : get the "id" tiposPontoTuristico.
     *
     * @param id the id of the tiposPontoTuristico to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tiposPontoTuristico, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipos-ponto-turisticos/{id}")
    public ResponseEntity<TiposPontoTuristico> getTiposPontoTuristico(@PathVariable Long id) {
        log.debug("REST request to get TiposPontoTuristico : {}", id);
        Optional<TiposPontoTuristico> tiposPontoTuristico = tiposPontoTuristicoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tiposPontoTuristico);
    }

    /**
     * {@code DELETE  /tipos-ponto-turisticos/:id} : delete the "id" tiposPontoTuristico.
     *
     * @param id the id of the tiposPontoTuristico to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipos-ponto-turisticos/{id}")
    public ResponseEntity<Void> deleteTiposPontoTuristico(@PathVariable Long id) {
        log.debug("REST request to delete TiposPontoTuristico : {}", id);
        tiposPontoTuristicoRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
