Feature: Tentacles form validation

  Scenario Outline: User enters a valid number within the allowed range
    Given User is on the tentacle input form
    When User enters a number <number> in the input field
    And User clicks the "Send" button
    Then System should display a "Success" message

    Examples:
      | number | #comment, not used in test scenario |
      | 10     | min value                           |
      | 50     | mid value                           |
      | 100    | mac value                           |
      | 010    | leading zero, might be trimmed      |
      | 50     | leading space, must be trimmed      |


  Scenario Outline: User enters an invalid number or character
    Given User is on the tentacle input form
    When User enters a <char> character in the input field
    And User clicks the "Send" button
    Then System should display an "Error" message

    Examples:
      | char | #comment, not used in test scenario                      |
      | 9    | below min value                                          |
      | 101  | above max value                                          |
      | abc  | non-numeric                                              |
      | 0    | zero                                                     |
      | 10.1 | float, assuming number of tentacles cannot be a fraction |
      |      | empty                                                    |
      | -10  | negative                                                 |
      | $$   | special character                                        |
      | null | null                                                     |