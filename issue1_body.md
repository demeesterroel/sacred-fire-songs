As an Admin, I want to upload a raw .cho file via an expandable upload section to auto-fill the form so that I don't have to type metadata manually.\n\n``
`Scenario: Import metadata from File via Expandable Section
     Given I am on the Add Song page
     When I click the "Or upload a file" toggle
          And I select a file containing 
"{title: Grandmother Earth} {author: Traditional} [C]Morning sun [G]rising high
[Am]Over the [F]mountain top"
      Then the "Title" field should be automatically filled with "Grandmother Earth"
       And the "Author" field should be automatically filled with "Traditional"
      And the "Content" field should be filled with the file body\n```





### Sub-issues
- [ ] #33
