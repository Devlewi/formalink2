<?php
namespace Tests\Feature;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class InscriptionTest extends TestCase
{
    /**
     * A basic feature test example.
     */

    /*
     */
    //simule un appel POST JSON vers ton endpoint /api/inscription avec des données valides (nom, prénom, contact, formation).
    public function test_inscription_valide()
    {
        $response = $this->postJson('/api/inscription', [
            'nom' => 'Jean',
            'prenom' => 'Dupont',
            'contact' => '0701020304',
            'formation' => 'Laravel'
        ]);

        //Elle vérifie deux choses :
        //Que le code de réponse est 201 (création réussie).
        //Que le message retourné est bien "Inscription réussie".

        $response->assertStatus(201)
                 ->assertJson([
                     'message' => 'Inscription réussie'
                 ]);

        //Elle s’assure aussi que les données ont bien été enregistrées en base avec assertDatabaseHas.
        $this->assertDatabaseHas('inscriptions', [
            'nom' => 'Jean',
            'prenom' => 'Dupont'
        ]);
    }


    // A AJOUTER
    //Elle attend que l’API retourne des erreurs de validation sur les champs requis :
    public function test_champs_requis_sont_valides()
        {
            $response = $this->postJson('/api/inscription', []);
            $response->assertStatus(422)
                    ->assertJsonValidationErrors(['nom', 'prenom', 'contact', 'formation']);
        }


}
