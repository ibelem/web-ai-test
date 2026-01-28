import argparse
import onnx
import os

# This script prunes the outputs of Text Encoder models to reduce memory usage.

# Usage:
#  python prune_onnx_outputs.py --input "text_encoder_model.onnx" --output "text_encoder_model_pruned.onnx" --keep hidden_states.11
#  python prune_onnx_outputs.py --input "text_encoder_2_model.onnx" --output "text_encoder_2_model_pruned.onnx" --keep hidden_states.31 text_embeds

def prune_outputs(input_path, output_path, keep_outputs):
    if not os.path.exists(input_path):
        print(f"Error: Input file '{input_path}' not found.")
        return

    print(f"Loading model from {input_path}...")
    model = onnx.load(input_path)
    graph = model.graph
    
    print("Original outputs:")
    existing_output_names = [out.name for out in graph.output]
    for name in existing_output_names:
        print(f" - {name}")
        
    # Check if requested outputs exist
    new_outputs = []
    for out in graph.output:
        if out.name in keep_outputs:
            new_outputs.append(out)
    
    # Verify we found everything
    found_names = [out.name for out in new_outputs]
    missing = set(keep_outputs) - set(found_names)
    if missing:
        print(f"\nWarning: The following requested outputs were NOT found in the model: {missing}")
        if not new_outputs:
            print("Error: No valid outputs selected. Aborting.")
            return

    # Replace graph outputs
    del graph.output[:]
    graph.output.extend(new_outputs)
    
    print("\nNew outputs:")
    for out in graph.output:
        print(f" - {out.name}")
        
    print(f"\nSaving modified model to {output_path}...")
    onnx.save(model, output_path)
    print("Done.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Prune ONNX model outputs to save memory.")
    parser.add_argument("--input", required=True, help="Input ONNX model path")
    parser.add_argument("--output", required=True, help="Output ONNX model path")
    parser.add_argument("--keep", nargs='+', required=True, help="List of output names to keep (space separated)")
    
    args = parser.parse_args()
    prune_outputs(args.input, args.output, args.keep)

