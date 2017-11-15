@ignore
Feature: SD Command

    Users want to share binaries or scripts across multiple containers
    so that they can easily use some commands in all containers.

    Screwdriver should have a single interface for executing a versioned command
    (via remote binary, docker image, or habitat package) during a build.

    Background:
        Given an existing pipeline with a command:
            | namespace | command | version |
            | foo       | bar     | 1.0.0   |

    Scenario Outline: Execute command in habitat
        Given command specifications as mode: <mode>, package: <package>, binary: <binary>
        When the command package mode is <mode>
        And execute with arguments: <arguments>
        Then the command finishes successfully

        Examples:
            | mode   | package         | binary | arguments   |
            | remote | core/git/2.14.1 | git    | -baz sample |
            | local  | ./foobar.hart   | git    | -baz sample |

    Scenario: Execute command in docker
        Given a command specification:
            | image      | arguments   |
            | node:1.2.3 | -baz sample |
        When execute the command with arguments: <arguments>
        Then the command finishes successfully

    Scenario: Execute command in binary
        Given a command specification:
            | file        | arguments   |
            | ./foobar.sh | -baz sample |
        When execute the command with arguments: <arguments>
        Then the command finishes successfully

    Scenario: Command publish
        Given a command specification file
        When execute publish
        Then the command to be successfully published

    Scenario Outline: Command promote
        Given promoting version is <promoting_version>
        And removing version is <removing_version>
        And promoting target is <tag>
        When execute promote
        Then promote <promoting_version> to <tag>
        And remove <removing_version> from <tag>

        Examples:
            | tag    | promoting_version | removing_version |
            | latest | 1.0.1             | 1.0.0            |

    Scenario: Get list of explicit command versions
        When execute list
        Then get list of explicit versions matching that range with comma separated tags next to applicable tags
