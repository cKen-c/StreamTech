import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Gestion des changements
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validation
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis";
    } else if (formData.name.length < 2) {
      newErrors.name = "Le nom doit contenir au moins 2 caractères";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "L'email est invalide";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Le sujet est requis";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Le message est requis";
    } else if (formData.message.length < 10) {
      newErrors.message = "Le message doit contenir au moins 10 caractères";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Vous devez accepter les conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Soumission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      console.log("Données envoyées :", formData);
      setSubmitSuccess(true);
      setIsSubmitting(false);

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        acceptTerms: false,
      });

      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="d-flex flex-column min-vh-100 justify-content-between">
      {/* Formulaire centré verticalement */}
      <div className="container my-auto py-5">
        <h1 className="mb-4">Contactez-nous</h1>

        {submitSuccess && (
          <div className="alert alert-success alert-dismissible fade show">
            <strong>Message envoyé !</strong> Nous vous répondrons rapidement.
            <button
              type="button"
              className="btn-close"
              onClick={() => setSubmitSuccess(false)}
            ></button>
          </div>
        )}

        <div className="card shadow">
          <div className="card-body p-4">
            <form onSubmit={handleSubmit} noValidate>
              {/* Nom */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Nom complet <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Votre nom"
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>

              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              {/* Sujet */}
              <div className="mb-3">
                <label htmlFor="subject" className="form-label">
                  Sujet <span className="text-danger">*</span>
                </label>
                <select
                  className={`form-select ${errors.subject ? "is-invalid" : ""}`}
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                >
                  <option value="">Choisissez un sujet</option>
                  <option value="question">Question générale</option>
                  <option value="bug">Signaler un bug</option>
                  <option value="feature">Demande de fonctionnalité</option>
                  <option value="other">Autre</option>
                </select>
                {errors.subject && (
                  <div className="invalid-feedback">{errors.subject}</div>
                )}
              </div>

              {/* Message */}
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Message <span className="text-danger">*</span>
                </label>
                <textarea
                  className={`form-control ${
                    errors.message ? "is-invalid" : ""
                  }`}
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Votre message..."
                ></textarea>
                {errors.message && (
                  <div className="invalid-feedback">{errors.message}</div>
                )}
                <div className="form-text">{formData.message.length}/500 caractères</div>
              </div>

              {/* Checkbox */}
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className={`form-check-input ${
                    errors.acceptTerms ? "is-invalid" : ""
                  }`}
                  id="acceptTerms"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="acceptTerms">
                  J'accepte les conditions d'utilisation
                </label>
                {errors.acceptTerms && (
                  <div className="invalid-feedback d-block">
                    {errors.acceptTerms}
                  </div>
                )}
              </div>

              {/* Bouton */}
              <button
                type="submit"
                className="btn btn-primary btn-lg w-100"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Envoi en cours...
                  </>
                ) : (
                  "Envoyer le message"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Cartes info en bas */}
      <div className="container mb-4 d-flex justify-content-center gap-3 flex-wrap">
        <div className="p-4 text-center">
          <h5 className="card-title mb-2">Adresse</h5>
          <p className="text-muted mb-0">123 Rue du Web<br />75001 Paris</p>
        </div>
        <div className="p-4 text-center">
          <h5 className="card-title mb-2">Email</h5>
          <p className="text-muted mb-0">contact@streamtech.fr</p>
        </div>
        <div className="p-4 text-center">
          <h5 className="card-title mb-2">Téléphone</h5>
          <p className="text-muted mb-0">01 23 45 67 89</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;


