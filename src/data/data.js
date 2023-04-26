// Data from the dataset
const labels = [
    "Capacity and Resources",
    "Legality, Constitutionality, Jurisdiction",
    "Security and Defence",
    "Cultural Identity",
    "Economic",
    "External Regulation",
    "Fairness and Equality",
    "Health and Safety",
];

const labels_size = [
    29,
    14,
    12,
    78,
    55,
    98,
    23,
    9
];

const length_in_tokens = [
    "1-6",
    "7-13",
    "14-30",
    "31-98",
    "99-379"
];

// Metrics
const system1 = {
    name: "System 1",
    accuracy:0.5213,
    precision: 0.4834,
    recall: 0.4656,
    batch_size: 16,
    learning_rate: 0.0001,
    accuracy_by_label: [
        0.78,
        0.47,
        0.18,
        0.51,
        0.42,
        0.58,
        0.49,
        0.38
    ],
    accuracy_by_tokens: [
        0.48,
        0.38,
        0.53,
        0.39,
        0.82
    ],
}

const system2 = {
    name: "System 2",
    accuracy:0.3859,
    precision: 0.4196,
    recall: 0.4139,
    batch_size: 8, 
    learning_rate: 0.0003,
    accuracy_by_label: [
        0.62,
        0.25,
        0.28,
        0.39,
        0.31,
        0.43,
        0.27,
        0.23
    ],
    accuracy_by_tokens: [
        0.42,
        0.22,
        0.56,
        0.17,
        0.61
    ]
}

const system3 = {
    name: "System 3",
    accuracy:0.3742,
    precision: 0.4049,
    recall: 0.3665,
    batch_size: 8,
    learning_rate: 0.0002,
    accuracy_by_label: [
        0.58,
        0.24,
        0.27,
        0.38,
        0.28,
        0.41,
        0.36,
        0.23
    ],
    accuracy_by_tokens: [
        0.41,
        0.25,
        0.56,
        0.14,
        0.58
    ]
}

const system4 = {
    name: "System 4",
    accuracy:0.4708,
    precision: 0.5082,
    recall: 0.5139,
    batch_size: 16,
    learning_rate: 0.0003,
    accuracy_by_label: [
        0.53,
        0.17,
        0.44,
        0.54,
        0.41,
        0.56,
        0.24,
        0.18
    ],
    accuracy_by_tokens: [
        0.35,
        0.32,
        0.46,
        0.18,
        0.52
    ]
}

const system5 = {
    name: "System 5",
    accuracy:0.5312,
    precision: 0.5438,
    recall: 0.5492,
    batch_size: 8,
    learning_rate: 0.0002,
    accuracy_by_label: [
        0.64,
        0.37,
        0.56,
        0.49,
        0.54,
        0.59,
        0.42,
        0.34
    ],
    accuracy_by_tokens: [
        0.44,
        0.28,
        0.58,
        0.32,
        0.62
    ]
}

const systems = [system1, system2, system3, system4, system5];

export { labels, labels_size, length_in_tokens, systems };