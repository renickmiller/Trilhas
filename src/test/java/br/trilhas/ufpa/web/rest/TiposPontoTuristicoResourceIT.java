package br.trilhas.ufpa.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.trilhas.ufpa.IntegrationTest;
import br.trilhas.ufpa.domain.TiposPontoTuristico;
import br.trilhas.ufpa.repository.TiposPontoTuristicoRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link TiposPontoTuristicoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TiposPontoTuristicoResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/tipos-ponto-turisticos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TiposPontoTuristicoRepository tiposPontoTuristicoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTiposPontoTuristicoMockMvc;

    private TiposPontoTuristico tiposPontoTuristico;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TiposPontoTuristico createEntity(EntityManager em) {
        TiposPontoTuristico tiposPontoTuristico = new TiposPontoTuristico().nome(DEFAULT_NOME).descricao(DEFAULT_DESCRICAO);
        return tiposPontoTuristico;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TiposPontoTuristico createUpdatedEntity(EntityManager em) {
        TiposPontoTuristico tiposPontoTuristico = new TiposPontoTuristico().nome(UPDATED_NOME).descricao(UPDATED_DESCRICAO);
        return tiposPontoTuristico;
    }

    @BeforeEach
    public void initTest() {
        tiposPontoTuristico = createEntity(em);
    }

    @Test
    @Transactional
    void createTiposPontoTuristico() throws Exception {
        int databaseSizeBeforeCreate = tiposPontoTuristicoRepository.findAll().size();
        // Create the TiposPontoTuristico
        restTiposPontoTuristicoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tiposPontoTuristico))
            )
            .andExpect(status().isCreated());

        // Validate the TiposPontoTuristico in the database
        List<TiposPontoTuristico> tiposPontoTuristicoList = tiposPontoTuristicoRepository.findAll();
        assertThat(tiposPontoTuristicoList).hasSize(databaseSizeBeforeCreate + 1);
        TiposPontoTuristico testTiposPontoTuristico = tiposPontoTuristicoList.get(tiposPontoTuristicoList.size() - 1);
        assertThat(testTiposPontoTuristico.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testTiposPontoTuristico.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
    }

    @Test
    @Transactional
    void createTiposPontoTuristicoWithExistingId() throws Exception {
        // Create the TiposPontoTuristico with an existing ID
        tiposPontoTuristico.setId(1L);

        int databaseSizeBeforeCreate = tiposPontoTuristicoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTiposPontoTuristicoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tiposPontoTuristico))
            )
            .andExpect(status().isBadRequest());

        // Validate the TiposPontoTuristico in the database
        List<TiposPontoTuristico> tiposPontoTuristicoList = tiposPontoTuristicoRepository.findAll();
        assertThat(tiposPontoTuristicoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllTiposPontoTuristicos() throws Exception {
        // Initialize the database
        tiposPontoTuristicoRepository.saveAndFlush(tiposPontoTuristico);

        // Get all the tiposPontoTuristicoList
        restTiposPontoTuristicoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tiposPontoTuristico.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)));
    }

    @Test
    @Transactional
    void getTiposPontoTuristico() throws Exception {
        // Initialize the database
        tiposPontoTuristicoRepository.saveAndFlush(tiposPontoTuristico);

        // Get the tiposPontoTuristico
        restTiposPontoTuristicoMockMvc
            .perform(get(ENTITY_API_URL_ID, tiposPontoTuristico.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tiposPontoTuristico.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO));
    }

    @Test
    @Transactional
    void getNonExistingTiposPontoTuristico() throws Exception {
        // Get the tiposPontoTuristico
        restTiposPontoTuristicoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewTiposPontoTuristico() throws Exception {
        // Initialize the database
        tiposPontoTuristicoRepository.saveAndFlush(tiposPontoTuristico);

        int databaseSizeBeforeUpdate = tiposPontoTuristicoRepository.findAll().size();

        // Update the tiposPontoTuristico
        TiposPontoTuristico updatedTiposPontoTuristico = tiposPontoTuristicoRepository.findById(tiposPontoTuristico.getId()).get();
        // Disconnect from session so that the updates on updatedTiposPontoTuristico are not directly saved in db
        em.detach(updatedTiposPontoTuristico);
        updatedTiposPontoTuristico.nome(UPDATED_NOME).descricao(UPDATED_DESCRICAO);

        restTiposPontoTuristicoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedTiposPontoTuristico.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedTiposPontoTuristico))
            )
            .andExpect(status().isOk());

        // Validate the TiposPontoTuristico in the database
        List<TiposPontoTuristico> tiposPontoTuristicoList = tiposPontoTuristicoRepository.findAll();
        assertThat(tiposPontoTuristicoList).hasSize(databaseSizeBeforeUpdate);
        TiposPontoTuristico testTiposPontoTuristico = tiposPontoTuristicoList.get(tiposPontoTuristicoList.size() - 1);
        assertThat(testTiposPontoTuristico.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testTiposPontoTuristico.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
    }

    @Test
    @Transactional
    void putNonExistingTiposPontoTuristico() throws Exception {
        int databaseSizeBeforeUpdate = tiposPontoTuristicoRepository.findAll().size();
        tiposPontoTuristico.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTiposPontoTuristicoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, tiposPontoTuristico.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tiposPontoTuristico))
            )
            .andExpect(status().isBadRequest());

        // Validate the TiposPontoTuristico in the database
        List<TiposPontoTuristico> tiposPontoTuristicoList = tiposPontoTuristicoRepository.findAll();
        assertThat(tiposPontoTuristicoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTiposPontoTuristico() throws Exception {
        int databaseSizeBeforeUpdate = tiposPontoTuristicoRepository.findAll().size();
        tiposPontoTuristico.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTiposPontoTuristicoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tiposPontoTuristico))
            )
            .andExpect(status().isBadRequest());

        // Validate the TiposPontoTuristico in the database
        List<TiposPontoTuristico> tiposPontoTuristicoList = tiposPontoTuristicoRepository.findAll();
        assertThat(tiposPontoTuristicoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTiposPontoTuristico() throws Exception {
        int databaseSizeBeforeUpdate = tiposPontoTuristicoRepository.findAll().size();
        tiposPontoTuristico.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTiposPontoTuristicoMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tiposPontoTuristico))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TiposPontoTuristico in the database
        List<TiposPontoTuristico> tiposPontoTuristicoList = tiposPontoTuristicoRepository.findAll();
        assertThat(tiposPontoTuristicoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTiposPontoTuristicoWithPatch() throws Exception {
        // Initialize the database
        tiposPontoTuristicoRepository.saveAndFlush(tiposPontoTuristico);

        int databaseSizeBeforeUpdate = tiposPontoTuristicoRepository.findAll().size();

        // Update the tiposPontoTuristico using partial update
        TiposPontoTuristico partialUpdatedTiposPontoTuristico = new TiposPontoTuristico();
        partialUpdatedTiposPontoTuristico.setId(tiposPontoTuristico.getId());

        restTiposPontoTuristicoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTiposPontoTuristico.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTiposPontoTuristico))
            )
            .andExpect(status().isOk());

        // Validate the TiposPontoTuristico in the database
        List<TiposPontoTuristico> tiposPontoTuristicoList = tiposPontoTuristicoRepository.findAll();
        assertThat(tiposPontoTuristicoList).hasSize(databaseSizeBeforeUpdate);
        TiposPontoTuristico testTiposPontoTuristico = tiposPontoTuristicoList.get(tiposPontoTuristicoList.size() - 1);
        assertThat(testTiposPontoTuristico.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testTiposPontoTuristico.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
    }

    @Test
    @Transactional
    void fullUpdateTiposPontoTuristicoWithPatch() throws Exception {
        // Initialize the database
        tiposPontoTuristicoRepository.saveAndFlush(tiposPontoTuristico);

        int databaseSizeBeforeUpdate = tiposPontoTuristicoRepository.findAll().size();

        // Update the tiposPontoTuristico using partial update
        TiposPontoTuristico partialUpdatedTiposPontoTuristico = new TiposPontoTuristico();
        partialUpdatedTiposPontoTuristico.setId(tiposPontoTuristico.getId());

        partialUpdatedTiposPontoTuristico.nome(UPDATED_NOME).descricao(UPDATED_DESCRICAO);

        restTiposPontoTuristicoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTiposPontoTuristico.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTiposPontoTuristico))
            )
            .andExpect(status().isOk());

        // Validate the TiposPontoTuristico in the database
        List<TiposPontoTuristico> tiposPontoTuristicoList = tiposPontoTuristicoRepository.findAll();
        assertThat(tiposPontoTuristicoList).hasSize(databaseSizeBeforeUpdate);
        TiposPontoTuristico testTiposPontoTuristico = tiposPontoTuristicoList.get(tiposPontoTuristicoList.size() - 1);
        assertThat(testTiposPontoTuristico.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testTiposPontoTuristico.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
    }

    @Test
    @Transactional
    void patchNonExistingTiposPontoTuristico() throws Exception {
        int databaseSizeBeforeUpdate = tiposPontoTuristicoRepository.findAll().size();
        tiposPontoTuristico.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTiposPontoTuristicoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, tiposPontoTuristico.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tiposPontoTuristico))
            )
            .andExpect(status().isBadRequest());

        // Validate the TiposPontoTuristico in the database
        List<TiposPontoTuristico> tiposPontoTuristicoList = tiposPontoTuristicoRepository.findAll();
        assertThat(tiposPontoTuristicoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTiposPontoTuristico() throws Exception {
        int databaseSizeBeforeUpdate = tiposPontoTuristicoRepository.findAll().size();
        tiposPontoTuristico.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTiposPontoTuristicoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tiposPontoTuristico))
            )
            .andExpect(status().isBadRequest());

        // Validate the TiposPontoTuristico in the database
        List<TiposPontoTuristico> tiposPontoTuristicoList = tiposPontoTuristicoRepository.findAll();
        assertThat(tiposPontoTuristicoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTiposPontoTuristico() throws Exception {
        int databaseSizeBeforeUpdate = tiposPontoTuristicoRepository.findAll().size();
        tiposPontoTuristico.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTiposPontoTuristicoMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tiposPontoTuristico))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TiposPontoTuristico in the database
        List<TiposPontoTuristico> tiposPontoTuristicoList = tiposPontoTuristicoRepository.findAll();
        assertThat(tiposPontoTuristicoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTiposPontoTuristico() throws Exception {
        // Initialize the database
        tiposPontoTuristicoRepository.saveAndFlush(tiposPontoTuristico);

        int databaseSizeBeforeDelete = tiposPontoTuristicoRepository.findAll().size();

        // Delete the tiposPontoTuristico
        restTiposPontoTuristicoMockMvc
            .perform(delete(ENTITY_API_URL_ID, tiposPontoTuristico.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TiposPontoTuristico> tiposPontoTuristicoList = tiposPontoTuristicoRepository.findAll();
        assertThat(tiposPontoTuristicoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
