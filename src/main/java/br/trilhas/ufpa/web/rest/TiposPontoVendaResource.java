package br.trilhas.ufpa.web.rest;

import br.trilhas.ufpa.domain.TiposPontoVenda;
import br.trilhas.ufpa.repository.TiposPontoVendaRepository;
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
 * REST controller for managing {@link br.trilhas.ufpa.domain.TiposPontoVenda}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TiposPontoVendaResource {

    private final Logger log = LoggerFactory.getLogger(TiposPontoVendaResource.class);

    private static final String ENTITY_NAME = "tiposPontoVenda";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TiposPontoVendaRepository tiposPontoVendaRepository;

    public TiposPontoVendaResource(TiposPontoVendaRepository tiposPontoVendaRepository) {
        this.tiposPontoVendaRepository = tiposPontoVendaRepository;
    }

    /**
     * {@code POST  /tipos-ponto-vendas} : Create a new tiposPontoVenda.
     *
     * @param tiposPontoVenda the tiposPontoVenda to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tiposPontoVenda, or with status {@code 400 (Bad Request)} if the tiposPontoVenda has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipos-ponto-vendas")
    public ResponseEntity<TiposPontoVenda> createTiposPontoVenda(@RequestBody TiposPontoVenda tiposPontoVenda) throws URISyntaxException {
        log.debug("REST request to save TiposPontoVenda : {}", tiposPontoVenda);
        if (tiposPontoVenda.getId() != null) {
            throw new BadRequestAlertException("A new tiposPontoVenda cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TiposPontoVenda result = tiposPontoVendaRepository.save(tiposPontoVenda);
        return ResponseEntity
            .created(new URI("/api/tipos-ponto-vendas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipos-ponto-vendas/:id} : Updates an existing tiposPontoVenda.
     *
     * @param id the id of the tiposPontoVenda to save.
     * @param tiposPontoVenda the tiposPontoVenda to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tiposPontoVenda,
     * or with status {@code 400 (Bad Request)} if the tiposPontoVenda is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tiposPontoVenda couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipos-ponto-vendas/{id}")
    public ResponseEntity<TiposPontoVenda> updateTiposPontoVenda(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TiposPontoVenda tiposPontoVenda
    ) throws URISyntaxException {
        log.debug("REST request to update TiposPontoVenda : {}, {}", id, tiposPontoVenda);
        if (tiposPontoVenda.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tiposPontoVenda.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tiposPontoVendaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TiposPontoVenda result = tiposPontoVendaRepository.save(tiposPontoVenda);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tiposPontoVenda.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /tipos-ponto-vendas/:id} : Partial updates given fields of an existing tiposPontoVenda, field will ignore if it is null
     *
     * @param id the id of the tiposPontoVenda to save.
     * @param tiposPontoVenda the tiposPontoVenda to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tiposPontoVenda,
     * or with status {@code 400 (Bad Request)} if the tiposPontoVenda is not valid,
     * or with status {@code 404 (Not Found)} if the tiposPontoVenda is not found,
     * or with status {@code 500 (Internal Server Error)} if the tiposPontoVenda couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/tipos-ponto-vendas/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TiposPontoVenda> partialUpdateTiposPontoVenda(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TiposPontoVenda tiposPontoVenda
    ) throws URISyntaxException {
        log.debug("REST request to partial update TiposPontoVenda partially : {}, {}", id, tiposPontoVenda);
        if (tiposPontoVenda.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tiposPontoVenda.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tiposPontoVendaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TiposPontoVenda> result = tiposPontoVendaRepository
            .findById(tiposPontoVenda.getId())
            .map(existingTiposPontoVenda -> {
                if (tiposPontoVenda.getNome() != null) {
                    existingTiposPontoVenda.setNome(tiposPontoVenda.getNome());
                }
                if (tiposPontoVenda.getDescricao() != null) {
                    existingTiposPontoVenda.setDescricao(tiposPontoVenda.getDescricao());
                }

                return existingTiposPontoVenda;
            })
            .map(tiposPontoVendaRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tiposPontoVenda.getId().toString())
        );
    }

    /**
     * {@code GET  /tipos-ponto-vendas} : get all the tiposPontoVendas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tiposPontoVendas in body.
     */
    @GetMapping("/tipos-ponto-vendas")
    public List<TiposPontoVenda> getAllTiposPontoVendas() {
        log.debug("REST request to get all TiposPontoVendas");
        return tiposPontoVendaRepository.findAll();
    }

    /**
     * {@code GET  /tipos-ponto-vendas/:id} : get the "id" tiposPontoVenda.
     *
     * @param id the id of the tiposPontoVenda to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tiposPontoVenda, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipos-ponto-vendas/{id}")
    public ResponseEntity<TiposPontoVenda> getTiposPontoVenda(@PathVariable Long id) {
        log.debug("REST request to get TiposPontoVenda : {}", id);
        Optional<TiposPontoVenda> tiposPontoVenda = tiposPontoVendaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tiposPontoVenda);
    }

    /**
     * {@code DELETE  /tipos-ponto-vendas/:id} : delete the "id" tiposPontoVenda.
     *
     * @param id the id of the tiposPontoVenda to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipos-ponto-vendas/{id}")
    public ResponseEntity<Void> deleteTiposPontoVenda(@PathVariable Long id) {
        log.debug("REST request to delete TiposPontoVenda : {}", id);
        tiposPontoVendaRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
