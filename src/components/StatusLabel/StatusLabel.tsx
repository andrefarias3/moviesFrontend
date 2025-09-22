import "./StatusLabel.scss"

interface StatusLabelProps {
    statusMsg: string;
}

export default function StatusLabel({ statusMsg }: StatusLabelProps) {

    return (
        <div className="status-label">{statusMsg}</div>
    )
};
