@ignore
Feature: SD Command

    Users want to share binaries or scripts across multiple containers
    so that they can easily use some commands in all containers.

    Screwdriver should have a single interface for executing a versioned command
    (via remote binary, docker image, or habitat package) during a build.

    Background:
        Given an existing pipeline with a command:
            | namespace   | command        | version |
            | sd-cmd-test | sample-command | 1.0.0   |

    Scenario Outline: Execute a command of habitat format
        Given command specifications as mode: <mode>, package: <package>, binary: <binary>
        When the command package mode is <mode>
        And execute the command with arguments: <arguments>
        Then the command finishes successfully

        Examples:
            | mode   | package         | binary | arguments     |
            | remote | core/git/2.14.1 | git    | git --version |
            | local  | ./sample.hart   | git    | git --version |

    Scenario: Execute a command of docker format
        Given command specification as image: "node:6"
        When execute the command with arguments: "node --version"
        Then the command finishes successfully

    Scenario: Execute a command of binary format
        Given command specification as file: "./sample.sh"
        When execute the command with arguments: "git --version"
        Then the command finishes successfully

    Scenario: Pulish a command
        Given command specification file
        When execute publish
        Then the command to be successfully published

    Scenario: Promote a command
        Given promoting version is "1.0.1"
        And promoting target is "latest"
        And currently "1.0.0" is tagged to "latest"
        When execute promote
        Then promote "1.0.1" to "latest"
        And remove "1.0.0" from "latest"

    Scenario: Get list of explicit command versions
        When execute list
        Then get list of explicit versions matching that range with comma separated tags next to applicable tags