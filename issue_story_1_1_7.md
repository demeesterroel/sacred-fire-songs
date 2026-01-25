# Issue: [Story 1.1.7] Add extended metadata fields (Key, Capo, Tuning)

**Description:**
> **Story 1.1.7**
> Sub-issue of #27 ([Story 1.1.1])
> As a Musician, I want to define the Key, Capo, and Tuning for a song so that others know exactly how to play it.

**Acceptance Criteria (Gherkin):**

```gherkin
Scenario: Musician defines song metadata
  Given I am on the "Add Song" page
  And I expand the "Add Tuning, Difficulty, Capo and Key" section
  When I select "Open G" from the "Tuning" dropdown
  And I select "2nd Fret" from the "Capo" dropdown
  And I select "Em" from the "Key" dropdown
  And I save the song
  Then the song should be saved with Tuning="Open G", Capo=2, and Key="Em"

Scenario: Musician views existing metadata
  Given a song exists with Tuning="Drop D" and Capo=0
  When I edit the song
  Then the "Tuning" dropdown should show "Drop D"
  And the "Capo" dropdown should show "No Capo"

Scenario: Default values
  Given I am on the "Add Song" page
  When I view the metadata section
  Then "Tuning" should default to "Standard"
  And "Capo" should default to "No Capo"
```

**Labels:** `user-story`, `epic-1.1`
