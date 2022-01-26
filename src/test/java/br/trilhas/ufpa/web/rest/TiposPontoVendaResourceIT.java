package br.trilhas.ufpa.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.trilhas.ufpa.IntegrationTest;
import br.trilhas.ufpa.domain.TiposPontoVenda;
import br.trilhas.ufpa.repository.TiposPontoVendaRepository;
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
 * Integration tests for the {@link TiposPontoVendaResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TiposPontoVendaResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/tipos-ponto-vendas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TiposPontoVendaRepository tiposPontoVendaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTiposPontoVendaMockMvc;

    private TiposPontoVenda tiposPontoVenda;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TiposPontoVenda createEntity(EntityManager em) {
        TiposPontoVenda tiposPontoVenda = new TiposPontoVenda().nome(DEFAULT_NOME).descricao(DEFAULT_DESCRICAO);
        return tiposPontoVenda;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TiposPontoVenda createUpdatedEntity(EntityManager em) {
        TiposPontoVenda tiposPontoVenda = new TiposPontoVenda().nome(UPDATED_NOME).descricao(UPDATED_DESCRICAO);
        return tiposPontoVenda;
    }

    @BeforeEach
    public void initTest() {
        tiposPontoVenda = createEntity(em);
    }

    @Test
    @Transactional
    void createTiposPontoVenda() throws Exception {
        int databaseSizeBeforeCreate = tiposPontoVendaRepository.findAll().size();
        // Create the TiposPontoVenda
        restTiposPontoVendaMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tiposPontoVenda))
            )
            .andExpect(status().isCreated());

        // Validate the TiposPontoVenda in the database
        List<TiposPontoVenda> tiposPontoVendaList = tiposPontoVendaRepository.findAll();
        assertThat(tiposPontoVendaList).hasSize(databaseSizeBeforeCreate + 1);
        TiposPontoVenda testTiposPontoVenda = tiposPontoVendaList.get(tiposPontoVendaList.size() - 1);
        assertThat(testTiposPontoVenda.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testTiposPontoVenda.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
    }

    @Test
    @Transactional
    void createTiposPontoVendaWithExistingId() throws Exception {
        // Create the TiposPontoVenda with an existing ID
        tiposPontoVenda.setId(1L);

        int databaseSizeBeforeCreate = tiposPontoVendaRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTiposPontoVendaMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tiposPontoVenda))
            )
            .andExpect(status().isBadRequest());

        // Validate the TiposPontoVenda in the database
        List<TiposPontoVenda> tiposPontoVendaList = tiposPontoVendaRepository.findAll();
        assertThat(tiposPontoVendaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllTiposPontoVendas() throws Exception {
        // Initialize the database
        tiposPontoVendaRepository.saveAndFlush(tiposPontoVenda);

        // Get all the tiposPontoVendaList
        restTiposPontoVendaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tiposPontoVenda.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)));
    }

    @Test
    @Transactional
    void getTiposPontoVenda() throws Exception {
        // Initialize the database
        tiposPontoVendaRepository.saveAndFlush(tiposPontoVenda);

        // Get the tiposPontoVenda
        restTiposPontoVendaMockMvc
            .perform(get(ENTITY_API_URL_ID, tiposPontoVenda.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tiposPontoVenda.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO));
    }

    @Test
    @Transactional
    void getNonExistingTiposPontoVenda() throws Exception {
        // Get the tiposPontoVenda
        restTiposPontoVendaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewTiposPontoVenda() throws Exception {
        // Initialize the database
        tiposPontoVendaRepository.saveAndFlush(tiposPontoVenda);

        int databaseSizeBeforeUpdate = tiposPontoVendaRepository.findAll().size();

        // Update the tiposPontoVenda
        TiposPontoVenda updatedTiposPontoVenda = tiposPontoVendaRepository.findById(tiposPontoVenda.getId()).get();
        // Disconnect from session so that the updates on updatedTiposPontoVenda are not directly saved in db
        em.detach(updatedTiposPontoVenda);
        updatedTiposPontoVenda.nome(UPDATED_NOME).descricao(UPDATED_DESCRICAO);

        restTiposPontoVendaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedTiposPontoVenda.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedTiposPontoVenda))
            )
            .andExpect(status().isOk());

        // Validate the TiposPontoVenda in the database
        List<TiposPontoVenda> tiposPontoVendaList = tiposPontoVendaRepository.findAll();
        assertThat(tiposPontoVendaList).hasSize(databaseSizeBeforeUpdate);
        TiposPontoVenda testTiposPontoVenda = tiposPontoVendaList.get(tiposPontoVendaList.size() - 1);
        assertThat(testTiposPontoVenda.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testTiposPontoVenda.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
    }

    @Test
    @Transactional
    void putNonExistingTiposPontoVenda() throws Exception {
        int databaseSizeBeforeUpdate = tiposPontoVendaRepository.findAll().size();
        tiposPontoVenda.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTiposPontoVendaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, tiposPontoVenda.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tiposPontoVenda))
            )
            .andExpect(status().isBadRequest());

        // Validate the TiposPontoVenda in the database
        List<TiposPontoVenda> tiposPontoVendaList = tiposPontoVendaRepository.findAll();
        assertThat(tiposPontoVendaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTiposPontoVenda() throws Exception {
        int databaseSizeBeforeUpdate = tiposPontoVendaRepository.findAll().size();
        tiposPontoVenda.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTiposPontoVendaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tiposPontoVenda))
            )
            .andExpect(status().isBadRequest());

        // Validate the TiposPontoVenda in the database
        List<TiposPontoVenda> tiposPontoVendaList = tiposPontoVendaRepository.findAll();
        assertThat(tiposPontoVendaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTiposPontoVenda() throws Exception {
        int databaseSizeBeforeUpdate = tiposPontoVendaRepository.findAll().size();
        tiposPontoVenda.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTiposPontoVendaMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tiposPontoVenda))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TiposPontoVenda in the database
        List<TiposPontoVenda> tiposPontoVendaList = tiposPontoVendaRepository.findAll();
        assertThat(tiposPontoVendaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTiposPontoVendaWithPatch() throws Exception {
        // Initialize the database
        tiposPontoVendaRepository.saveAndFlush(tiposPontoVenda);

        int databaseSizeBeforeUpdate = tiposPontoVendaRepository.findAll().size();

        // Update the tiposPontoVenda using partial update
        TiposPontoVenda partialUpdatedTiposPontoVenda = new TiposPontoVenda();
        partialUpdatedTiposPontoVenda.setId(tiposPontoVenda.getId());

        partialUpdatedTiposPontoVenda.descricao(UPDATED_DESCRICAO);

        restTiposPontoVendaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTiposPontoVenda.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTiposPontoVenda))
            )
            .andExpect(status().isOk());

        // Validate the TiposPontoVenda in the database
        List<TiposPontoVenda> tiposPontoVendaList = tiposPontoVendaRepository.findAll();
        assertThat(tiposPontoVendaList).hasSize(databaseSizeBeforeUpdate);
        TiposPontoVenda testTiposPontoVenda = tiposPontoVendaList.get(tiposPontoVendaList.size() - 1);
        assertThat(testTiposPontoVenda.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testTiposPontoVenda.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
    }

    @Test
    @Transactional
    void fullUpdateTiposPontoVendaWithPatch() throws Exception {
        // Initialize the database
        tiposPontoVendaRepository.saveAndFlush(tiposPontoVenda);

        int databaseSizeBeforeUpdate = tiposPontoVendaRepository.findAll().size();

        // Update the tiposPontoVenda using partial update
        TiposPontoVenda partialUpdatedTiposPontoVenda = new TiposPontoVenda();
        partialUpdatedTiposPontoVenda.setId(tiposPontoVenda.getId());

        partialUpdatedTiposPontoVenda.nome(UPDATED_NOME).descricao(UPDATED_DESCRICAO);

        restTiposPontoVendaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTiposPontoVenda.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTiposPontoVenda))
            )
            .andExpect(status().isOk());

        // Validate the TiposPontoVenda in the database
        List<TiposPontoVenda> tiposPontoVendaList = tiposPontoVendaRepository.findAll();
        assertThat(tiposPontoVendaList).hasSize(databaseSizeBeforeUpdate);
        TiposPontoVenda testTiposPontoVenda = tiposPontoVendaList.get(tiposPontoVendaList.size() - 1);
        assertThat(testTiposPontoVenda.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testTiposPontoVenda.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
    }

    @Test
    @Transactional
    void patchNonExistingTiposPontoVenda() throws Exception {
        int databaseSizeBeforeUpdate = tiposPontoVendaRepository.findAll().size();
        tiposPontoVenda.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTiposPontoVendaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, tiposPontoVenda.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tiposPontoVenda))
            )
            .andExpect(status().isBadRequest());

        // Validate the TiposPontoVenda in the database
        List<TiposPontoVenda> tiposPontoVendaList = tiposPontoVendaRepository.findAll();
        assertThat(tiposPontoVendaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTiposPontoVenda() throws Exception {
        int databaseSizeBeforeUpdate = tiposPontoVendaRepository.findAll().size();
        tiposPontoVenda.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTiposPontoVendaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tiposPontoVenda))
            )
            .andExpect(status().isBadRequest());

        // Validate the TiposPontoVenda in the database
        List<TiposPontoVenda> tiposPontoVendaList = tiposPontoVendaRepository.findAll();
        assertThat(tiposPontoVendaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTiposPontoVenda() throws Exception {
        int databaseSizeBeforeUpdate = tiposPontoVendaRepository.findAll().size();
        tiposPontoVenda.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTiposPontoVendaMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tiposPontoVenda))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TiposPontoVenda in the database
        List<TiposPontoVenda> tiposPontoVendaList = tiposPontoVendaRepository.findAll();
        assertThat(tiposPontoVendaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTiposPontoVenda() throws Exception {
        // Initialize the database
        tiposPontoVendaRepository.saveAndFlush(tiposPontoVenda);

        int databaseSizeBeforeDelete = tiposPontoVendaRepository.findAll().size();

        // Delete the tiposPontoVenda
        restTiposPontoVendaMockMvc
            .perform(delete(ENTITY_API_URL_ID, tiposPontoVenda.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TiposPontoVenda> tiposPontoVendaList = tiposPontoVendaRepository.findAll();
        assertThat(tiposPontoVendaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
