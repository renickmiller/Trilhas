package br.trilhas.ufpa.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CadastroTrilha.
 */
@Entity
@Table(name = "cadastro_trilha")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CadastroTrilha implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "data_hora")
    private LocalDate dataHora;

    @JsonIgnoreProperties(
        value = { "situacoesTrilha", "pontosCardeais", "pontosVendas", "pontosTuristicos", "fotografias" },
        allowSetters = true
    )
    @OneToOne
    @JoinColumn(unique = true)
    private Trilhas trilhas;

    @ManyToOne
    @JsonIgnoreProperties(value = { "cadastroTrilhas" }, allowSetters = true)
    private Usuario usuario;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public CadastroTrilha id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDataHora() {
        return this.dataHora;
    }

    public CadastroTrilha dataHora(LocalDate dataHora) {
        this.setDataHora(dataHora);
        return this;
    }

    public void setDataHora(LocalDate dataHora) {
        this.dataHora = dataHora;
    }

    public Trilhas getTrilhas() {
        return this.trilhas;
    }

    public void setTrilhas(Trilhas trilhas) {
        this.trilhas = trilhas;
    }

    public CadastroTrilha trilhas(Trilhas trilhas) {
        this.setTrilhas(trilhas);
        return this;
    }

    public Usuario getUsuario() {
        return this.usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public CadastroTrilha usuario(Usuario usuario) {
        this.setUsuario(usuario);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CadastroTrilha)) {
            return false;
        }
        return id != null && id.equals(((CadastroTrilha) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CadastroTrilha{" +
            "id=" + getId() +
            ", dataHora='" + getDataHora() + "'" +
            "}";
    }
}
