/* eslint-disable @typescript-eslint/no-unused-vars */
//frontend
"use client";

import { useState } from "react";

export default function Inscription() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    contact: "",
    formation: "",
  });

  const [erreur, setErreur] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErreur("");

    if (!formData.nom || !formData.prenom || !formData.contact || !formData.formation) {
      setErreur("Tous les champs sont requis.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/inscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.status === 201) {
        alert("Inscription réussie !");
      } else {
        setErreur(data.message || "Une erreur est survenue.");
      }
    } catch (error) {
      setErreur("Erreur serveur.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-6 sm:p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-600">Inscription à une formation</h1>

        {erreur && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
            data-cy="erreur"
          >
            {erreur}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom</label>
            <input
              type="text"
              name="nom"
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2 text-gray-800"
              placeholder="Entrez votre nom"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Prénom</label>
            <input
              type="text"
              name="prenom"
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2 text-gray-800"
              placeholder="Entrez votre prénom"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contact</label>
            <input
              type="text"
              name="contact"
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2 text-gray-800"
              placeholder="Numéro de téléphone"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Formation</label>
            <select
              name="formation"
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2 text-gray-800"
            >
              <option value="">Choisir une formation</option>
              <option value="Laravel">Laravel</option>
              <option value="Next.js">Next.js</option>
              <option value="React">React</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-medium py-2 px-4 rounded-lg shadow-sm"
          >
            Valider
          </button>
        </form>
      </div>
    </div>
  );
}
